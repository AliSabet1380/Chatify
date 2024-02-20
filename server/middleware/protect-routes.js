const jwt = require("jsonwebtoken");
const AppError = require("./../lib/app-error");
const promisify = require("./../lib/promisify");
const catchAsync = require("./../lib/catch-async");
const User = require("../models/user-model");

exports.protectUnauthorized = catchAsync(async (req, res, next) => {
  const token = req.cookies.session;
  if (!token) return next(new AppError("Unauthorized!", 403));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) return next(new AppError("The token is not valid!", 403));

  const user = await User.findById(decoded.id).select("-password");

  const didUserUpdate = user.checkSessionExpire;
  if (didUserUpdate)
    return next(new AppError("Token is no longer valid after update", 403));

  req.user = user;
  next();
});
