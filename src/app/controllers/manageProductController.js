const Product = require('../models/product');

class ManageProductController {
    async manageProducts(req, res) {
        try {
            console.log("Fetching products..."); // Log này sẽ giúp bạn biết controller có chạy không
            const products = await Product.find().lean();
            console.log("Products fetched:", products); // Log danh sách sản phẩm
            res.render("manageProducts", { products });
        } catch (err) {
            console.log(err);
            res.status(500).send("Lỗi khi lấy sản phẩm");
        }
    }
}


module.exports = new ManageProductController();
