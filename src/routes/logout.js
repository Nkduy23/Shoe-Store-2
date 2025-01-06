const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/logoutController');

router.get("/", authController.logout);

module.exports = router;
