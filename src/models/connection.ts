import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Database connection string is undefined. Check your .env file.');
}

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error,'Database connection failed'));