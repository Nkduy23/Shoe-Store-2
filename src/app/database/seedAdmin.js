const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

dotenv.config();
console.log("Database URI:", process.env.MONGODB_URI); // Debug URI

// Hàm tạo tài khoản admin
async function createAdmin() {
  try {
    // Kết nối database
    await mongoose.connect("mongodb://127.0.0.1:27017/Shoe_Store_2");

    // Kiểm tra xem admin đã tồn tại chưa
    const existingUser = await User.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingUser) {
      console.log("Admin đã tồn tại.");
      return;
    }

    // Tạo tài khoản admin
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("Tài khoản admin đã được tạo thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
