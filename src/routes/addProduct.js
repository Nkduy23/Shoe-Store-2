const express = require('express');
const router = express.Router();
const addProductController = require('../app/controllers/addProductController');
const requireAdmin = require('../app/middleware/requireAdmin');
const upload = require('../app/config/multer'); // Kiểm tra đúng đường dẫn

// Route GET để hiển thị form thêm sản phẩm
router.get('/', requireAdmin, addProductController.addProduct);

// Route POST để thêm sản phẩm
router.post('/', requireAdmin, upload.single('image'), addProductController.addProductPost);

module.exports = router;
