class AuthController {
    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).send("Logout failed");
            }
            res.redirect("/login");
        });
    }
}

module.exports = new AuthController();
