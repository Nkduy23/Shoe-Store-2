class homeController {
    index(req, res) {
        res.render('home', {showSlider: true, showFlashSale: true});
    }
}

module.exports = new homeController();