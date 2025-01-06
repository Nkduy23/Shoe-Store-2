const mongoose = require("mongoose");

async function connectDB() {
  try {
    // Kết nối đến MongoDB với URI từ biến môi trường
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    // Xử lý lỗi nếu kết nối thất bại
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }
}

module.exports = { connectDB };
