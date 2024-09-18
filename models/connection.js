import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error,'Database connection failed'));