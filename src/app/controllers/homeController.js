const Product = require('../models/product'); // Đảm bảo đường dẫn đúng với model Product

class HomeController {
    async index(req, res) {
        try {
            // Tìm kiếm sản phẩm từ database
            const [saleProducts, regularProducts] = await Promise.all([
                Product.find({ isSale: true }).lean(),  // Sản phẩm sale
                Product.find({ isSale: false }).lean()  // Sản phẩm thường
            ]);

            // Render trang 'home' với dữ liệu
            res.render('home', {
                showSlider: true,           // Hiển thị slider
                showFlashSale: true,        // Hiển thị flash sale
                saleProducts,               // Truyền sản phẩm sale
                regularProducts            // Truyền sản phẩm thường
            });

            console.log("Session on /home:", req.session); 
        } catch (err) {
            // Xử lý lỗi và in thông tin lỗi ra console
            console.error('Error fetching products:', err);
            res.status(500).send('Error fetching products');  // Trả về lỗi 500
        }
    }
}

module.exports = new HomeController();
