const express = require("express");
const { protectUnauthorized } = require("./../middleware/protect-routes");
const { getUsers } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", protectUnauthorized, getUsers);

module.exports = router;
