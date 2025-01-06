const multer = require("multer");
const path = require("path");

// ---------------------------- Cấu hình lưu trữ cho Multer ----------------------------
const storage = multer.diskStorage({
  // Địa chỉ thư mục lưu tệp tin tải lên
  destination: (req, file, cb) => {
    // Đảm bảo thư mục uploads tồn tại và chỉ định đường dẫn lưu tệp tin
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  
  // Đặt tên cho tệp tin sau khi tải lên
  filename: (req, file, cb) => {
    // Đổi tên file bằng cách sử dụng thời gian hiện tại để đảm bảo tên file là duy nhất
    // path.extname sẽ lấy phần mở rộng của tệp tin (ví dụ: .jpg, .png)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ---------------------------- Tạo instance upload ----------------------------
const upload = multer({ storage: storage });

// ---------------------------- Export instance upload ----------------------------
module.exports = upload;
