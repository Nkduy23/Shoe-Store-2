const express = require('express');
const router = express.Router();
const deleteProductController = require('../app/controllers/deleteProductController');
const requireAdmin = require('../app/middleware/requireAdmin');
const upload = require('../app/config/multer'); // Kiểm tra đúng đường dẫn

// Route cho xóa sản phẩm
router.get('/:id', requireAdmin, deleteProductController.deleteProduct);

module.exports = router;
