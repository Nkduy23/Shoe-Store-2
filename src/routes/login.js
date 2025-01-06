const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController');

// Route hiển thị trang đăng nhập
router.get('/', loginController.login);

// Route xử lý đăng nhập
router.post('/', loginController.postLogin);

module.exports = router;
