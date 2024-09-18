const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  profilePicture: { type: String, default: "" },
  password: String,
  token: String,
  createdAt: Date,
  UpdatedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
