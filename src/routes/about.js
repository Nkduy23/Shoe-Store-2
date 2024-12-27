const express =require('express');
const router = express.Router();
const aboutController = require('../app/controllers/aboutController');

router.get('/',aboutController.about);
router.get('/hello',aboutController.hello);

module.exports = router;