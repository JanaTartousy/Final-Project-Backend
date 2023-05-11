import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDatabase from "./config/db.js";

import adminRouter from "./routes/adminRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";
import postRouter from "./routes/postRouter.js";
import socialmediaRouter from "./routes/socialmediaRouter.js";
import tourRouter from "./routes/tourRouter.js";
import userRouter from "./routes/userRouter.js";

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

app.use("/admin", adminRouter);
app.use("/booking", bookingRouter);
app.use("/feedback", feedbackRouter);
app.use("/post", postRouter);
app.use("/socialmedia", socialmediaRouter);
app.use("/tour", tourRouter);
app.use("/user", userRouter);
