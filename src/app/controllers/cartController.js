const Product = require('../models/product');

class CartController {
    async addToCart(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            const quantity = parseInt(req.body.quantity, 10) || 1;
            const existingProduct = req.session.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                req.session.cart.push({ ...product.toObject(), quantity });
            }
            res.redirect("/cart");
        } catch (error) {
            console.error("Add to cart error:", error);
            res.status(500).send("Failed to add product to cart");
        }
    }

    showCart(req, res) {
        res.render("cart", { cart: req.session.cart });
    }

    updateCart(req, res) {
        const product = req.session.cart.find(item => item.id === req.params.id);
        if (product) {
            product.quantity = parseInt(req.body.quantity, 10);
        }
        res.redirect("/cart");
    }

    removeFromCart(req, res) {
        req.session.cart = req.session.cart.filter(item => item.id !== req.params.id);
        res.redirect("/cart");
    }
}

module.exports = new CartController();