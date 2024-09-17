const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  refreshToken: String,
  createdAt: {date:Date},
  updatedAt: {date:Date},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model('users', userSchema);

module.exports = User;