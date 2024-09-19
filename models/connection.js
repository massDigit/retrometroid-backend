<<<<<<< HEAD
const mongoose = require("mongoose");
require("dotenv").config();
=======
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
>>>>>>> 6d4e3da6f0c7e01b61604b7a1496d7c95800d1d4

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

<<<<<<< HEAD
mongoose
  .connect(mongoURI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
=======
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error,'Database connection failed'));
>>>>>>> 6d4e3da6f0c7e01b61604b7a1496d7c95800d1d4
