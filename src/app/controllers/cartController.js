const Product = require("../models/product");

class CartController {
  // Thêm sản phẩm vào giỏ hàng
  async addToCart(req, res) {
    try {
      // Kiểm tra ID sản phẩm truyền vào
      console.log("Product ID:", req.params.id);

      // Tìm sản phẩm trong cơ sở dữ liệu MongoDB
      const product = await Product.findById(req.params.id);

      // Nếu không tìm thấy sản phẩm
      if (!product) {
        console.error("Product not found!");
        return res.status(404).send("Product not found");
      }

      console.log("Product found:", product);

      // Lấy số lượng sản phẩm từ request body, mặc định là 1 nếu không có
      const quantity = parseInt(req.body.quantity, 10) || 1;
      console.log("Quantity:", quantity);

      // Kiểm tra nếu giỏ hàng chưa tồn tại trong session thì khởi tạo giỏ hàng mới
      if (!req.session.cart) {
        req.session.cart = [];
      }

      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
      const existingProduct = req.session.cart.find((item) => item._id.toString() === product._id.toString());
      if (existingProduct) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        existingProduct.quantity += quantity;
        console.log("Updated existing product:", existingProduct);
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        req.session.cart.push({ ...product.toObject(), quantity });
        console.log("Added new product to cart:", product);
      }

      // Sau khi thêm vào giỏ hàng, chuyển hướng đến trang giỏ hàng
      res.redirect("/cart"); // Chuyển hướng đến giỏ hàng
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Add to cart error:", error);
      res.status(500).send("Failed to add product to cart");
    }
  }

  // Hiển thị giỏ hàng
  showCart(req, res) {
    // In giỏ hàng trong session (dùng để kiểm tra)
    console.log("Cart:", req.session.cart);
    
    // Render trang giỏ hàng và truyền dữ liệu giỏ hàng vào view
    res.render("showCart", { cart: req.session.cart || [] });
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCart(req, res) {
    // Tìm sản phẩm trong giỏ hàng theo ID
    const product = req.session.cart.find((item) => item._id.toString() === req.params.id);

    if (product) {
      // Cập nhật số lượng sản phẩm
      product.quantity = parseInt(req.body.quantity, 10);
      console.log("Updated product quantity:", product);
    }

    // Sau khi cập nhật, chuyển hướng lại đến trang giỏ hàng
    res.redirect("/cart");
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(req, res) {
    // Lọc giỏ hàng và loại bỏ sản phẩm theo ID
    req.session.cart = req.session.cart.filter((item) => item._id.toString() !== req.params.id);
    console.log("Removed product from cart:", req.params.id);

    // Sau khi xóa, chuyển hướng lại đến trang giỏ hàng
    res.redirect("/cart");
  }
}

module.exports = new CartController();
