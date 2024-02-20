// Modules
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const GlobalErrorHandler = require("./controllers/global-error-controller");
const authRoutes = require("./routes/auth-routes");
const messageRoutes = require("./routes/message-routes");
const userRoutes = require("./routes/user-routes");

// Variables
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Global Error
app.use(GlobalErrorHandler);

// Modules Export
module.exports = app;
