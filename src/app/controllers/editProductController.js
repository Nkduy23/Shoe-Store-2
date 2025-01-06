const Product = require('../models/product');

class EditProductController {
  // Hàm hiển thị form chỉnh sửa sản phẩm
  async editProductForm(req, res) {
    try {
      // Tìm sản phẩm theo ID và chuyển đổi kết quả thành đối tượng thông thường (lean)
      const product = await Product.findById(req.params.id).lean();
      
      // Nếu không tìm thấy sản phẩm, trả về lỗi 404
      if (!product) return res.status(404).send("Sản phẩm không tồn tại");
      
      // Render form chỉnh sửa và truyền sản phẩm vào
      res.render("editProduct", { product });
    } catch (err) {
      // Xử lý lỗi nếu có trong quá trình lấy sản phẩm
      console.error("Lỗi khi lấy sản phẩm:", err);
      res.status(500).send("Lỗi khi lấy sản phẩm");
    }
  }

  // Hàm cập nhật sản phẩm
  async updateProduct(req, res) {
    try {
      const { name, description, price, isSale } = req.body;
      const imageUrl = req.file ? "/uploads/" + req.file.filename : undefined;

      // Tìm sản phẩm theo ID
      const product = await Product.findById(req.params.id);
      
      // Nếu không tìm thấy sản phẩm, trả về lỗi 404
      if (!product) return res.status(404).send("Sản phẩm không tồn tại");

      // Cập nhật thông tin sản phẩm (chỉ thay đổi những trường có giá trị mới)
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ? parseFloat(price) : product.price;
      product.isSale = isSale === "on";  // Kiểm tra trạng thái của "isSale"
      product.image = imageUrl || product.image; // Cập nhật hình ảnh nếu có

      // Lưu lại sản phẩm đã cập nhật
      await product.save();

      // Sau khi cập nhật thành công, chuyển hướng về trang chủ hoặc danh sách sản phẩm
      res.redirect("/home"); // Hoặc có thể redirect đến trang quản lý sản phẩm nếu cần
    } catch (err) {
      // Xử lý lỗi nếu có trong quá trình cập nhật sản phẩm
      console.error("Lỗi cập nhật sản phẩm:", err);
      res.status(500).send("Lỗi cập nhật sản phẩm");
    }
  }
}

module.exports = new EditProductController();
