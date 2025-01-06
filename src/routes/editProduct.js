const express = require('express');
const router = express.Router();
const editProductController = require('../app/controllers/editProductController');
const requireAdmin = require('../app/middleware/requireAdmin');
const upload = require('../app/config/multer'); // Kiểm tra đúng đường dẫn

// Route cho chỉnh sửa sản phẩm
router.get('/:id',requireAdmin, editProductController.editProductForm);
router.post('/:id',requireAdmin, upload.single('image'), editProductController.updateProduct);

module.exports = router;
