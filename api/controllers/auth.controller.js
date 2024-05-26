import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(errorHandler(400, "Username orr email existing")); // Nếu tồn tại, trả về lỗi 400
    }
    // Mã hóa mật khẩu sử dụng bcrypt với độ dài muối là 10
    const hashedPassword = await bcryptjs.hashSync(password, 10); //mã hóa password
    // Tạo một đối tượng người dùng mới với thông tin đã nhập và mật khẩu đã mã hóa
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // Lưu người dùng mới vào cơ sở dữ liệu
    await newUser.save();
    // Trả về phản hồi thành công

    res.json("Signup Successfull");
  } catch (error) {
    next(error);
  }
};
