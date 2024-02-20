const express = require("express");
const { protectUnauthorized } = require("./../middleware/protect-routes");
const {
  sendMessage,
  getMessage,
} = require("./../controllers/message-controller");

const router = express.Router();

router.get("/:id", protectUnauthorized, getMessage);
router.post("/send/:id", protectUnauthorized, sendMessage);

module.exports = router;
