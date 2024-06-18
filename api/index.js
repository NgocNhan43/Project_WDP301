import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import cookieParser from "cookie-parser";
import commentRoutes from './routes/comment.route.js';
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected !");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Sever is running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
//Middleware xử lý lỗi: Được sử dụng để bắt và xử lý tất cả các lỗi trong ứng dụng.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal sever Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
