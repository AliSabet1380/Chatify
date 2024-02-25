const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports.server = server;
module.exports.app = app;
module.exports.io = io;
module.exports.getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};
