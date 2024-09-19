<<<<<<< HEAD
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
=======
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
},{ timestamps: true });

const User = mongoose.model('users', userSchema);

export default User;
>>>>>>> 6d4e3da6f0c7e01b61604b7a1496d7c95800d1d4
