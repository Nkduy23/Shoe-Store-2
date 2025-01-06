const User = require("../models/user");

class LoginController {
  login(req, res) {
    res.render("login", { pageClass: "login-page", errorMessage: req.flash("error") });
  }

  async postLogin(req, res) {
    try {
      const { username, password } = req.body;

      // Kiểm tra xem đã có dữ liệu username và password chưa
      console.log("Login attempt:", { username, password });

      if (!username || !password) {
        req.flash("error", "Vui lòng điền đầy đủ thông tin.");
        return res.redirect("/login");
      }

      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });
      console.log("Found user:", user);  // Kiểm tra xem có tìm được người dùng không

      if (!user) {
        req.flash("error", "Tên người dùng hoặc mật khẩu không hợp lệ");
        console.log("User not found");
        return res.redirect("/login");
      }

      // Kiểm tra mật khẩu
      const isMatch = await user.comparePassword(password);
      console.log("Password match:", isMatch);  // Kiểm tra xem mật khẩu có đúng không
      
      if (!isMatch) {
        req.flash("error", "Tên người dùng hoặc mật khẩu không hợp lệ");
        console.log("Incorrect password");
        return res.redirect("/login");
      }

      // Lưu thông tin người dùng vào session và chuyển hướng
      req.session.userId = user._id;
      req.session.username = user.username;
      req.session.userRole = user.role;
      console.log("User logged in:", { userId: user._id, username: user.username, role: user.role });
      res.redirect("/home");

    } catch (err) {
      console.error("Error during login:", err);
      req.flash("error", "Đã có lỗi xảy ra. Vui lòng thử lại.");
      res.redirect("/login");
    }
  }
}

module.exports = new LoginController();
