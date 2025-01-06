class AuthController {
    // Xử lý đăng xuất người dùng
    logout(req, res) {
      req.session.destroy(err => {
        if (err) {
          console.error("Logout error:", err);
          return res.status(500).send("Đăng xuất thất bại");
        }
        res.redirect("/login");
      });
    }
  }
  
  module.exports = new AuthController();
  