// Modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app.js");

// Config dotenv file
dotenv.config();

// Variables
const DB = process.env.DATA_BASE_URL.replace(
  "<password>",
  process.env.DATA_BASE_PASSWORD
);
const PORT = process.env.PORT || 5000;

mongoose.connect(DB).then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
