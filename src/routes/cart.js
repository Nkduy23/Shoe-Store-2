const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/cartController');

router.post("/add/:id", cartController.addToCart);
router.get("/", cartController.showCart);
router.post("/update/:id", cartController.updateCart);
router.get("/remove/:id", cartController.removeFromCart);

module.exports = router;
