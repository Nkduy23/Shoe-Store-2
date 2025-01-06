const mongoose = require('mongoose');

// Cập nhật schema để thêm trường 'image' lưu tên hoặc URL của hình ảnh
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isSale: { type: Boolean, default: false },
    sale: { type: Number, default: 0 }, // Phần trăm giảm giá
    colors: { type: [String], required: true }, // Mảng màu sắc
    image: { type: String, required: true },  // Thêm trường để lưu tên hình ảnh
}, { timestamps: true });

// Tránh lỗi "OverwriteModelError"
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;