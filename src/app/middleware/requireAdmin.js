const requireAdmin = (req, res, next) => {
  if (!req.session.userRole) {
    return res.status(401).send("Unauthorized"); // Chưa đăng nhập
  }
  if (req.session.userRole !== "admin") {
    return res.status(403).send("Forbidden"); // Không phải admin
  }
  next();
};

module.exports = requireAdmin;
