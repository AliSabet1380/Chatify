const jwt = require("jsonwebtoken");
const catchAsync = require("./catch-async");

exports.createTokenAndSetCookie = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_DATE,
  });

  res.cookie("session", token, {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
