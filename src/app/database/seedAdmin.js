const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

dotenv.config();

// Kiểm tra nếu chưa có .env thì thông báo lỗi
if (!process.env.MONGODB_URI || !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  console.error("Cần đảm bảo các biến môi trường MONGODB_URI, ADMIN_USERNAME và ADMIN_PASSWORD đã được cấu hình.");
  process.exit(1);
}

// Hàm tạo tài khoản admin
async function createAdmin() {
  try {
    // Kết nối đến MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Kiểm tra xem admin đã tồn tại chưa
    const existingUser = await User.findOne({ username: process.env.ADMIN_USERNAME });
    if (existingUser) {
      console.log("Admin đã tồn tại.");
      return;
    }

    // Tạo tài khoản admin mới
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      role: "admin",
    });

    // Lưu vào cơ sở dữ liệu
    await adminUser.save();
    console.log("Tài khoản admin đã được tạo thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
  } finally {
    // Đảm bảo ngắt kết nối khi hoàn tất
    mongoose.disconnect();
  }
}

createAdmin();
