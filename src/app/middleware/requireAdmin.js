const requireAdmin = (req, res, next) => {
  if (!req.session.userRole) {
    return res.status(401).json({ message: "Unauthorized: You must log in first" });
  }

  if (req.session.userRole !== "admin") {
    return res.status(403).json({ message: "Forbidden: You do not have admin privileges" });
  }

  next();
};

module.exports = requireAdmin;
