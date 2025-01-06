const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/registerController");

// Route hiển thị trang đăng ký
router.get("/", registerController.registerPage);

// Route xử lý đăng ký người dùng
router.post("/", registerController.registerUser);

module.exports = router;
