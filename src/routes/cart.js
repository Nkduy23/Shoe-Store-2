const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/cartController');

// Thêm sản phẩm vào giỏ hàng
router.post("/add/:id", cartController.addToCart);

// Hiển thị giỏ hàng
router.get("/", cartController.showCart);

// Cập nhật giỏ hàng
router.post("/update/:id", cartController.updateCart);

// Xóa sản phẩm khỏi giỏ hàng
router.get("/remove/:id", cartController.removeFromCart);

module.exports = router;
