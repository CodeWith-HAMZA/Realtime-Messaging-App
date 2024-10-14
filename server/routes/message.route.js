const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");
const { authenticateToken } = require("../middleware");
const Chat = require("../models/chat.model");
const multer = require("multer");
const upload = require("../config/multer");
const Media = require("../models/media.model");

// Create a new message
router.post("/", authenticateToken, upload.single("file"), async (req, res) => {
  console.log(req.file, " shaddu");

  try {
    const { chatId, content } = req.body;
    const senderId = req.user._id;
    // Create a new message instance
    const message = new Message({ chat: chatId, sender: senderId, content });

    // Save the message to the database
    let savedMessage = await message.save();

    const chat = await Chat.findById(chatId);
    chat["latestMessage"] = savedMessage._id;
    await chat.save();

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const media = await Media.create({
      message: savedMessage._id,
      url: req.file ? fileUrl : "null",
      mediaType: req.file ? req.file.mimetype : "image",
    });

    if (media) {
      savedMessage["media"] = [media];
    }

    return res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all messages of a particular chat
router.get("/:chatId", authenticateToken, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    console.log(chatId, "chat aaaaaaaagiaaieutehus");

    // Fetch all messages associated with the provided chat ID
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email profile") // Populate sender details
      .populate({
        path: "chat",
        select: "chatName isGroupChat groupAdmin",
        populate: {
          path: "users",
          select: "name email profile",
        },
      });

    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
