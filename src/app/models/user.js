const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// Middleware để mã hóa mật khẩu trước khi lưu vào database
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Mã hóa mật khẩu
  }
  next();
});

// Phương thức để so sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);  // So sánh mật khẩu
};

const User = mongoose.model("User", userSchema);

module.exports = User; 
