const express = require("express");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const { authenticateToken } = require("../middleware");
const router = express.Router();

// body - otherUserId
router.route("/access-chat").post(authenticateToken, async function (req, res) {
  const { otherUserId } = req.body;
  const currentUser = req.user._id;
  if (!otherUserId) {
    console.log(
      "The Other User Id is not sent, kindly the send the other user-id"
    );
    return res.sendStatus(400);
  }

  // * Finding one-to-one private-chat (not-a-group)
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currentUser } } },
      { users: { $elemMatch: { $eq: otherUserId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // * Populating The Sender-Data through the (user/sender) id in the Message
  // isChat = await User.find(isChat, {
  //     path: "latestMessage.sender",
  //    ` select: "name email profile`"
  // })

  // * If CHat-Found then, return the chat, otherwise, create a new-chat between those-two-users
  if (isChat.length > 0) {
    const chat = isChat[0];
    // * sending the one-to-one private chat, if found
    return res.status(200).json({ chat, message: "Chat is already created" });
  } else {
    // * but, if not found, creating the new-chat one-to-one private-chat
    const createdChat = await Chat.create({
      chatName: "sender",
      // isGroupChat: false, -- by-default already false
      users: [currentUser, otherUserId],
    });

    // * Find the created-Chat again as we want to populate the user too with chat
    const chatWithPopulatedUsers = await Chat.findById(
      createdChat._id
    ).populate("users", "-password");
    return res.status(200).json({
      chat: chatWithPopulatedUsers,
      message: "Successfully Created The Chat",
    });
  }
});

// token
router.route("/all").get(authenticateToken, async function (req, res) {
  const currentUser = req.user._id;

  try {
    // Retrieve all chats where the users array contains the specified userId
    const chats = await Chat.find({ users: { $all: [currentUser] } })
      .populate({ path: "users", select: "name email profile" }) // Populate 'users' field with 'name' and 'email' properties
      .populate({ path: "groupAdmin", select: "name email profile" }) // Populate 'admins' field with 'name' and 'email' properties
      .populate({
        path: "latestMessage",
        select: "content createdAt",
        populate: { path: "sender", select: "email profile -_id" },
      })
      .sort({ updatedAt: "descending" }); // Sort chats from newest to oldest based on 'createdAt' field

    return res.json({ chats });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

// create-groupchat
router.route("/group").post(authenticateToken, async function (req, res) {
  try {
    const { chatName, users } = req.body;
    const currentUser = req.user._id;

    if (!chatName || !users) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Parse the users field as JSON if it is a string
    const parsedUsers = typeof users === "string" ? JSON.parse(users) : users;

    if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
      return res.status(400).json({ message: "Invalid users field" });
    }

    if (parsedUsers.length < 2) {
      return res
        .status(400)
        .json({ message: "At least 3 Users Exist To Form A Group Chat" });
    }

    const existingGroup = await Chat.findOne({ chatName, isGroupChat: true });

    if (existingGroup) {
      return res.status(400).json({
        message: "Group chat with the same name already exists",
        groupChat: existingGroup,
      });
    }

    // Create a new group chat instance
    const groupChat = new Chat({
      chatName,
      isGroupChat: true,
      // * Also the Current-User(Who Created The Group-Chat) Will Be A Part Of The Group-CHat-Conversation
      users: [...parsedUsers, currentUser],
      groupAdmin: currentUser,
    });

    // Save the group chat to the database
    const savedGroupChat = await groupChat.save();

    // Find the newly created group chat by populating the users field
    const populatedGroupChat = await Chat.findById(savedGroupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json({
      groupChat: populatedGroupChat,
      message: "Successfully Created Group-Chat",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to create group chat" });
  }
});

router.route("/rename").put(authenticateToken, async function (req, res) {
  try {
    const { groupId, newName } = req.body;
    const currentUser = req.user._id;

    if (!groupId || !newName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the group chat by ID
    const groupChat = await Chat.findById(groupId);

    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }

    // Check if the current user is the group admin
    if (groupChat.groupAdmin.toString() !== currentUser) {
      return res
        .status(403)
        .json({ message: "Only the group admin can rename the group" });
    }

    // Update the chatName field with the new name
    groupChat.chatName = newName;

    // Save the updated group chat
    const updatedGroupChat = await groupChat.save();

    return res.json({
      groupChat: updatedGroupChat,
      message: "Group chat renamed successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to rename group chat" });
  }
});

router.get("/group-chats", authenticateToken, async function (req, res) {
  try {
    const currentUser = req.user._id;

    // Find all group chats where the current user is a member
    const groupChats = await Chat.find({
      isGroupChat: true,
      users: { $in: [currentUser] },
    })
      .populate("users", "name email")
      .populate("groupAdmin", "name email");

    return res.json({ groupChats });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to fetch group chats" });
  }
});

router.route("/group/add").put(authenticateToken, async function (req, res) {
  try {
    const { groupId, userId } = req.body;
    const currentUser = req.user._id;

    if (!groupId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the group chat by ID
    const groupChat = await Chat.findById(groupId);

    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }

    // Check if the current user is the group admin
    if (groupChat.groupAdmin.toString() !== currentUser) {
      return res
        .status(403)
        .json({ message: "Only the group admin can add users to the group" });
    }

    // Add the user to the group, if it doesn't exist in group
    if (!groupChat.users.includes(userId)) {
      groupChat.users.push(userId);
    } else {
      return res
        .status(400)
        .json({ message: "already the member of the group" });
    }

    // Save the updated group chat
    const updatedGroupChat = await groupChat.save();

    return res.json({
      groupChat: updatedGroupChat,
      totalUsers: updatedGroupChat?.users?.length,
      message: "User added to the group successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to add user to the group" });
  }
});

router.route("/group/remove").put(authenticateToken, async function (req, res) {
  try {
    const { groupId, userId } = req.body;
    const currentUser = req.user._id;

    if (!groupId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the group chat by ID
    const groupChat = await Chat.findById(groupId);

    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }

    // Check if the current user is the group admin
    if (groupChat.groupAdmin.toString() !== currentUser) {
      return res.status(403).json({
        message: "Only the group admin can remove users from the group",
      });
    }

    if (!groupChat.users.includes(userId)) {
      return res.status(404).json({ message: "User Not Found In The Group" });
    }

    // Remove the user from the group
    const userIndex = groupChat.users.indexOf(userId);
    if (userIndex > -1) {
      groupChat.users.splice(userIndex, 1);
    }

    // Save the updated group chat
    const updatedGroupChat = await groupChat.save();

    return res.json({
      groupChat: updatedGroupChat,
      totalUsers: updatedGroupChat.users.length,
      message: "User removed from the group successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove user from the group" });
  }
});

router
  .route("/group/make-admin")
  .put(authenticateToken, async function (req, res) {
    try {
      const { groupId, userId } = req.body;
      const currentUser = req.user._id;

      if (!groupId || !userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if (typeof groupId !== "string" || typeof groupId !== "string") {
        return res.status(400).json({
          error: "Both Group-id, and user-id must be a pure string-ids",
        });
      }

      // Find the group chat by ID
      const groupChat = await Chat.findById(groupId);

      if (!groupChat) {
        return res.status(404).json({ message: "Group chat not found" });
      }

      // Check if the current user is the group admin
      if (groupChat.groupAdmin.toString() !== currentUser) {
        return res
          .status(403)
          .json({ message: "Only the group admin can promote users to admin" });
      }

      // Update the group admin field with the new user
      groupChat.groupAdmin = userId;

      // Save the updated group chat
      const updatedGroupChat = await groupChat.save();

      return res.json({
        groupChat: updatedGroupChat,
        message: "User promoted to admin successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Failed to promote user to admin" });
    }
  });

// Route to get a single chat by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const chatId = req.params.id;
    // Fetch chat from the database using the provided ID
    const chat = await Chat.findById(chatId.toString())
      .populate("users", "_id name email")
      .populate("groupAdmin", "_id name email ")
      .populate({
        path: "latestMessage",
        select: "content createdAt",
        populate: { path: "sender", select: "email -_id" },
      });
    if (!chat) {
      // If chat with the provided ID is not found, return 404 Not Found
      return res.status(404).json({ message: "Chat not found" });
    }
    // If chat is found, return it in the response
    return res.status(200).json(chat);
  } catch (error) {
    // If there's an error, return 500 Internal Server Error
    console.error("Error fetching chat:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
