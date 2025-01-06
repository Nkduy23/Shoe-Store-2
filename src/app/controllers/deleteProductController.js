const Product = require('../models/product');

class DeleteProductController {
  // Hàm xóa sản phẩm theo ID
  async deleteProduct(req, res) {
    try {
      // Tìm và xóa sản phẩm theo ID từ URL params
      const product = await Product.findByIdAndDelete(req.params.id);

      // Nếu không tìm thấy sản phẩm, trả về lỗi 404
      if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại");
      }

      // Sau khi xóa thành công, chuyển hướng về trang quản lý sản phẩm
      res.redirect("/manageProducts");
    } catch (err) {
      // Xử lý lỗi nếu có trong quá trình xóa sản phẩm
      console.error("Lỗi khi xóa sản phẩm:", err);
      res.status(500).send("Lỗi khi xóa sản phẩm");
    }
  }
}

module.exports = new DeleteProductController();
