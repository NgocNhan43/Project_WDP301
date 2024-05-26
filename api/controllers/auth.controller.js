import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
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
      return next(errorHandler(400, "Username or email existing")); // Nếu tồn tại, trả về lỗi 400
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid passWord"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access  _token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
