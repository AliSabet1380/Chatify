const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    messages: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Message", default: [] }],
    },
    participants: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Convesation", conversationSchema);

module.exports = Conversation;
