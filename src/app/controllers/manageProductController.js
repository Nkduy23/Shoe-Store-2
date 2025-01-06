const Product = require('../models/product');

class ManageProductController {
    // Hiển thị danh sách sản phẩm quản lý
    async manageProducts(req, res) {
        try {
            console.log("Fetching products..."); // Log để kiểm tra controller có chạy không
            const products = await Product.find().lean();  // Lấy tất cả sản phẩm từ DB
            console.log("Products fetched:", products); // Log sản phẩm đã lấy được

            // Render view quản lý sản phẩm và truyền danh sách sản phẩm
            res.render("manageProducts", { products });
        } catch (err) {
            console.error("Error fetching products:", err);  // In ra lỗi khi lấy sản phẩm
            res.status(500).send("Lỗi khi lấy sản phẩm");  // Trả về lỗi 500 nếu có vấn đề
        }
    }
}

module.exports = new ManageProductController();
