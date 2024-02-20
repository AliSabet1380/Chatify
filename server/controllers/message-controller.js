const Conversation = require("./../models/conversation-model");
const Message = require("./../models/message-model");
const AppError = require("../lib/app-error");
const catchAsync = require("../lib/catch-async");

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { id: reciverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;

  let convesation;
  convesation = await Conversation.findOne({
    participants: { $all: [senderId, reciverId] },
  });
  if (!convesation)
    convesation = await Conversation.create({
      participants: [senderId, reciverId],
    });

  const newMessage = new Message({
    reciverId,
    message,
    senderId,
  });

  if (!newMessage)
    return next(new AppError("Can not create your message", 500));

  convesation.messages.push(newMessage._id);

  // SOCKET.IO

  await Promise.all([newMessage.save(), convesation.save()]);

  res.status(201).json({ status: "success", data: { message: newMessage } });
});

exports.getMessage = catchAsync(async (req, res, next) => {
  const { id: reciverId } = req.params;
  const senderId = req.user.id;

  const conversationWithMessage = await Conversation.findOne({
    participants: { $all: [reciverId, senderId] },
  }).populate("messages");

  res.status(200).json({
    status: "success",
    results: conversationWithMessage.messages.length,
    data: {
      messages: conversationWithMessage.messages,
    },
  });
});
