const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,

      required: true,
    },
    size: {
      type: Number, // Size in bytes, if needed
    },
    duration: {
      type: Number, // Duration in seconds, for videos if needed
    },
    thumbnail: {
      type: String, // URL for a thumbnail image, if applicable
    },
  },
  { timestamps: true }
);

const Media = mongoose.models["Media"] || mongoose.model("Media", mediaSchema);

module.exports = Media;
