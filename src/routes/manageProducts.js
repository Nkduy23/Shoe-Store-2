const express = require("express");
const router = express.Router();
const manageProductController = require("../app/controllers/manageProductController");
const requireAdmin = require("../app/middleware/requireAdmin");

router.get("/", requireAdmin, manageProductController.manageProducts);

module.exports = router;
