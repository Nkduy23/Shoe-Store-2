const Product = require('../models/product'); // Nhập đúng mô hình Product (Model cho sản phẩm)

class AddProductController {
    // Hàm để hiển thị trang thêm sản phẩm
    async addProduct(req, res) {
        // Render trang addProduct với class CSS là 'add-product-page'
        res.render('addProduct', { pageClass: 'add-product-page' });
    }

    // Hàm để xử lý khi gửi form thêm sản phẩm
    async addProductPost(req, res) {
        try {
            // Lấy thông tin từ req.body và xử lý các giá trị
            const { name, description, price, sale, colors } = req.body;
            const isSale = req.body.isSale ? true : false; // Kiểm tra nếu sản phẩm có khuyến mãi
            const imageUrl = req.file ? "uploads/" + req.file.filename : ""; // Nếu có file ảnh, lưu đường dẫn ảnh

            const saleValue = parseInt(sale) || 0; // Nếu không có giá trị sale, mặc định là 0

            // Tạo một instance của Product mới
            const newProduct = new Product({
                name,               // Tên sản phẩm
                description,        // Mô tả sản phẩm
                price,              // Giá sản phẩm
                isSale,             // Đã có khuyến mãi hay chưa
                sale: saleValue,    // Giá trị giảm giá (nếu có)
                colors: colors ? colors.split(",").map(color => color.trim()) : [], // Mảng màu (nếu có)
                image: imageUrl,    // Đường dẫn ảnh sản phẩm
            });

            // Lưu sản phẩm mới vào cơ sở dữ liệu
            await newProduct.save();
            // Chuyển hướng về trang home sau khi thêm sản phẩm thành công
            res.redirect("/home");
        } catch (err) {
            // Nếu có lỗi, hiển thị thông báo lỗi và mã lỗi 500
            console.error("Error adding product:", err);
            res.status(500).send("Error adding product");
        }
    }
}

module.exports = new AddProductController();
