const Product = require('../models/product');

class EditProductController {
    async editProductForm(req, res) {
        try {
            const product = await Product.findById(req.params.id).lean();
            if (!product) return res.status(404).send("Product not found");
            res.render("editProduct", { product });
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm:", err);
            res.status(500).send("Lỗi khi lấy sản phẩm");
        }
    }

    async updateProduct(req, res) {
        try {
            const { name, description, price, isSale } = req.body;
            const imageUrl = req.file ? "/uploads/" + req.file.filename : undefined;

            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).send("Không tìm thấy sản phẩm");

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price ? parseFloat(price) : product.price;
            product.isSale = isSale === "on";
            product.image = imageUrl || product.image;

            await product.save();
            res.redirect("/");
        } catch (err) {
            console.error("Lỗi cập nhật sản phẩm:", err);
            res.status(500).send("Lỗi cập nhật sản phẩm");
        }
    }
}

module.exports = new EditProductController();
