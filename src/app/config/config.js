const dotenv = require("dotenv");

// ---------------------------- Tải các biến môi trường từ .env ----------------------------
dotenv.config();

// ---------------------------- Cấu hình session ----------------------------
const sessionConfig = {
  // Khóa bí mật dùng để mã hóa session
  secret: process.env.SESSION_SECRET || "defaultSecretKey", // Nếu không có SESSION_SECRET trong .env, sẽ dùng giá trị mặc định là "defaultSecretKey"
  
  // Không lưu lại session nếu nó không thay đổi
  resave: false,
  
  // Lưu session ngay cả khi nó chưa được khởi tạo
  saveUninitialized: true,

  // Cấu hình cookie bảo mật cho session
  cookie: {
    // Chỉ sử dụng cookie bảo mật khi ứng dụng chạy trong môi trường production
    secure: process.env.NODE_ENV === "production", 
  },
};

// Xuất cấu hình session để sử dụng ở các phần khác của ứng dụng
module.exports = { sessionConfig };
