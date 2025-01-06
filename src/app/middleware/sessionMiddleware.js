// middlewares/sessionMiddleware.js
module.exports = (req, res, next) => {
    console.log("Session Middleware:", req.session); 
    // Kiểm tra xem session có tồn tại không, nếu không gán giá trị mặc định
    res.locals.user = req.session && req.session.username ? req.session.username : null;
    res.locals.role = req.session && req.session.userRole ? req.session.userRole : 'guest';
    next();  // Tiến hành xử lý tiếp
};
