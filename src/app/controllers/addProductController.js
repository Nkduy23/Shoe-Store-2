const Product = require('../models/product'); // Nhập đúng mô hình Product

class AddProductController {
    async addProduct(req, res) {
        res.render('addProduct', { pageClass: 'add-product-page' });
    }

    async addProductPost(req, res) {
        try {
            const { name, description, price, sale, colors } = req.body;
            const isSale = req.body.isSale ? true : false;
            const imageUrl = req.file ? "uploads/" + req.file.filename : "";

            const saleValue = parseInt(sale) || 0;

            const newProduct = new Product({
                name,
                description,
                price,
                isSale,
                sale: saleValue,
                colors: colors ? colors.split(",").map(color => color.trim()) : [],
                image: imageUrl,
            });

            await newProduct.save();
            res.redirect("/home");
        } catch (err) {
            console.error("Error adding product:", err);
            res.status(500).send("Error adding product");
        }
    }
}

module.exports = new AddProductController();