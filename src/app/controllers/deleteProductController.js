const Product = require('../models/product');

class DeleteProductController {
    async deleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.redirect("/manageProducts");
        } catch (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
            res.status(500).send("Lỗi khi xóa sản phẩm");
        }
    }
}

module.exports = new DeleteProductController();
