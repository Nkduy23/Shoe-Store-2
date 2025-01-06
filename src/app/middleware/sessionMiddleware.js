module.exports = (req, res, next) => {
    console.log("Session Middleware:", req.session); 

    // Kiểm tra và gán giá trị mặc định cho thông tin người dùng
    try {
        res.locals.user = req.session && req.session.username ? req.session.username : null;
        res.locals.role = req.session && req.session.userRole ? req.session.userRole : 'guest';
    } catch (error) {
        console.error("Error processing session data:", error);
        res.locals.user = null;
        res.locals.role = 'guest';
    }

    next();  // Tiến hành xử lý tiếp
};
