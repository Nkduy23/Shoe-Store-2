const multer = require("multer");
const path = require("path");

// Cấu hình lưu trữ cho Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads")); // Đảm bảo thư mục tồn tại
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file
  },
});

// Tạo instance upload
const upload = multer({ storage: storage });

// Export instance
module.exports = upload;
