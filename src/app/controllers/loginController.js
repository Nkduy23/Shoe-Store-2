class loginController {
    login(req, res) {
        res.render('login');
    }
}

module.exports = new loginController();