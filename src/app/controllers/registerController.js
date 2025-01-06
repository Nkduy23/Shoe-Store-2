const User = require('../models/user');  // Import model User
const bcrypt = require('bcryptjs');

class RegisterController {
  // Hiển thị trang đăng ký
  registerPage(req, res) {
    res.render('register', { pageClass: 'register-page' });
  }

  // Hàm xử lý việc tạo người dùng mới
  async registerUser(req, res) {
    try {
      const { username, password, role = 'user' } = req.body;

      // Kiểm tra tên đăng nhập và mật khẩu
      if (!username || username.length < 3) {
        return res.status(400).send("Username phải có ít nhất 3 ký tự");
      }

      if (!password || password.length < 6) {
        return res.status(400).send("Password phải có ít nhất 6 ký tự");
      }

      // Kiểm tra xem username đã tồn tại chưa
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send("Username đã tồn tại");
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Tạo người dùng mới và lưu vào DB
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();
      
      // Redirect tới trang đăng nhập
      req.flash('success', 'Đăng ký thành công. Bạn có thể đăng nhập ngay.');
      res.redirect('/login');
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      req.flash('error', 'Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.');
      res.redirect('/register');
    }
  }
}

module.exports = new RegisterController();
