const User = require("../models/user");

class LoginController {
  // Render trang login và hiển thị thông báo lỗi nếu có
  login(req, res) {
    res.render("login", {
      pageClass: "login-page",
      errorMessage: req.flash("error")
    });
  }

  // Xử lý khi người dùng gửi form đăng nhập
  async postLogin(req, res) {
    const { username, password } = req.body;

    // Kiểm tra nếu không có username hoặc password
    if (!username || !password) {
      req.flash("error", "Vui lòng điền đầy đủ thông tin.");
      return res.redirect("/login");
    }

    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });

      if (!user) {
        req.flash("error", "Tên người dùng hoặc mật khẩu không hợp lệ");
        return res.redirect("/login");
      }

      // Kiểm tra mật khẩu
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        req.flash("error", "Tên người dùng hoặc mật khẩu không hợp lệ");
        return res.redirect("/login");
      }

      // Lưu thông tin người dùng vào session và chuyển hướng đến trang home
      req.session.userId = user._id;
      req.session.username = user.username;
      req.session.userRole = user.role;
      
      console.log("User logged in:", {
        userId: user._id,
        username: user.username,
        role: user.role
      });

      res.redirect("/home");

    } catch (err) {
      console.error("Error during login:", err);
      req.flash("error", "Đã có lỗi xảy ra. Vui lòng thử lại.");
      res.redirect("/login");
    }
  }
}

module.exports = new LoginController();
