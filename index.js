import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDatabase from './config/db.js';

dotenv.config();

connectToDatabase();

const PORT = process.env.PORT || 5000; 

const app = new express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

app.use(express.json());

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
  );

