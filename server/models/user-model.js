const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required!"],
    },
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: [true, "username is already in use!"],
      minLength: [3, "username must be at least 3 char"],
      maxLength: [15, "username can not be more than 15 char"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minLength: 6,
    },
    passwordConfirm: {
      type: String,
      required: [true, "password confirm is required!"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "password and password confirm should be the same!",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

/// Pre & Post Middlewares

userSchema.pre("save", async function (next) {
  if (!this.isModified) return next();

  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.passwordConfirm = undefined;
  }
  next();
});

/// Methods

userSchema.methods.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.checkSessionExpire = (userUpdateAt, expireTime) => {
  const timeStamp = userUpdateAt.getTime() / 1000;

  return expireTime < timeStamp;
};

// MODEL

const User = mongoose.model("User", userSchema);

// Module Export

module.exports = User;
