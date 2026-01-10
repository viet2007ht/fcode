const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Đăng ký
const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // 1. Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = await User.create({
      full_name,
      email,
      password_hash: hashPassword,
      role: role || "student", // Mặc định là học sinh
    });

    res.status(201).json({ message: "Register successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Tìm user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    // 2. So sánh mật khẩu (Pass nhập vào vs Pass đã mã hóa trong DB)
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    // 3. Tạo JWT Token
    // Token này chứa ID và Role, hết hạn sau 1 ngày
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      "FCODE_SECRET_KEY_123", // Thực tế nên để trong file .env
      { expiresIn: "1d" }
    );

    // 4. Trả về Token và thông tin user
    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar: user.avatar_url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login };
