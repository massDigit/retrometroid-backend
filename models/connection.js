import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const connectionString = mongoURI;
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error, "Database connection failed"));
