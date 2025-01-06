const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// Không cần mã hóa lại mật khẩu ở đây

// So sánh mật khẩu khi người dùng đăng nhập
userSchema.methods.comparePassword = async function (password) {
  console.log("Mật khẩu người dùng nhập vào:", password);  // Log mật khẩu người dùng nhập khi đăng nhập
  console.log("Mật khẩu đã lưu trong cơ sở dữ liệu:", this.password);  // Log mật khẩu đã lưu (đã mã hóa)

  return bcrypt.compare(password, this.password);  // So sánh mật khẩu đã mã hóa với mật khẩu nhập vào
};

const User = mongoose.model("User", userSchema);

module.exports = User; // Đảm bảo chỉ export model User
