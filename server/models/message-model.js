const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
    },
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Sender ID is required!"],
    },
    reciverId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "reciver ID is required!"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
