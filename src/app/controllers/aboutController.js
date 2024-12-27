class aboutController {
    about(req, res) {
        res.render('about');
    }
    hello(req, res) {
        res.render('hello')  
    }
}

module.exports = new aboutController();