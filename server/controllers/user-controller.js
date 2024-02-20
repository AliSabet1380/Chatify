const User = require("./../models/user-model");
const AppError = require("./../lib/app-error");
const catchAsync = require("./../lib/catch-async");

exports.getUsers = catchAsync(async (req, res, next) => {
  const loggedInUser = req.user;
  const allUsers = await User.find({ _id: { $ne: loggedInUser._id } }).select(
    "-password"
  );

  res.status(200).json({
    status: "success",
    data: {
      users: allUsers,
    },
  });
});
