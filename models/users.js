import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
