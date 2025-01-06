const { engine } = require("express-handlebars");
const path = require("path");
const handlebarsHelpers = require("./app/helpers/handlebarsHelpers");

module.exports = (app) => {
  app.engine(
    "hbs",
    engine({
      extname: "hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "resources", "views", "layouts"),
      partialsDir: path.join(__dirname, "resources", "views", "partials"),
      helpers: handlebarsHelpers, // Đăng ký helpers
    })
  );
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "resources", "views"));
};
