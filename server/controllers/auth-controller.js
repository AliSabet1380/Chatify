const User = require("./../models/user-model");
const catchAsync = require("./../lib/catch-async");
const AppError = require("./../lib/app-error");
const { createTokenAndSetCookie } = require("./../lib/jwt-token-utils");

exports.signup = catchAsync(async (req, res, next) => {
  const { fullName, username, password, passwordConfirm, gender } = req.body;
  let { avatar } = req.body;

  if (!avatar) {
    avatar = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;
  }

  const user = await User.create({
    password,
    passwordConfirm,
    fullName,
    username,
    avatar,
    gender,
  });

  if (!user) return next(new AppError("Can not create new user!", 500));

  createTokenAndSetCookie(user._id, res);

  res.status(201).json({
    status: "success",
    data: {
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return next(new AppError("user not found!", 404));

  const isPasswordValid = await user.comparePassword(password, user.password);
  if (!isPasswordValid)
    return next(new AppError("password is not valid!", 403));

  createTokenAndSetCookie(user._id, res);

  res.status(200).json({
    status: "success",
    data: {
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("session", null, { maxAge: 0 });
  res.status(200).json({
    status: "success",
    data: null,
  });
});
