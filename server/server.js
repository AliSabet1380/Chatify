// Modules
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const { server } = require("./socket/socket");
const { app } = require("./socket/socket.js");

const GlobalErrorHandler = require("./controllers/global-error-controller");
const authRoutes = require("./routes/auth-routes");
const messageRoutes = require("./routes/message-routes");
const userRoutes = require("./routes/user-routes");

// Config dotenv file
dotenv.config();

// Variables
const __dirtname = path.resolve();

const DB = process.env.DATA_BASE_URL.replace(
  "<password>",
  process.env.DATA_BASE_PASSWORD
);
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Static files
app.use(express.static(path.join(__dirtname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirtname, "client", "dist", "index.html"));
});

// Global Error
app.use(GlobalErrorHandler);

// Connect To Db And Start The Server
mongoose.connect(DB).then(() => {
  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
