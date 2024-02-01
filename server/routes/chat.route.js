const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Chat = require("../models/chat.model");
const router = express.Router();
router.route("/").post(protect, async function (req, res, next) {

    const { userId } = req.body;
    if (!userId) {
        console.log("The Other User Id is not sent, kindly the send the other user-id");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

});
// router.route("/").get(protect, fetchChats);
// router.route("/group").post (protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup); I

module.exports = router