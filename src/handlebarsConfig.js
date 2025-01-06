const { engine } = require("express-handlebars");
const path = require("path");
const handlebarsHelpers = require("./app/helpers/handlebarsHelpers");

module.exports = (app) => {
  // ---------------------------- Cấu hình Handlebars ----------------------------
  app.engine(
    "hbs", // Đăng ký engine với phần mở rộng là hbs
    engine({
      extname: "hbs", // Đặt phần mở rộng file template là hbs
      defaultLayout: "main", // Đặt layout mặc định là 'main'
      layoutsDir: path.join(__dirname, "resources", "views", "layouts"), // Đường dẫn đến thư mục chứa layouts
      partialsDir: path.join(__dirname, "resources", "views", "partials"), // Đường dẫn đến thư mục chứa partials
      helpers: handlebarsHelpers, // Đăng ký helpers (các hàm trợ giúp) để sử dụng trong templates
    })
  );

  // ---------------------------- Thiết lập View Engine ----------------------------
  app.set("view engine", "hbs"); // Đặt view engine là Handlebars (hbs)
  app.set("views", path.join(__dirname, "resources", "views")); // Đặt thư mục chứa views
};
