const express = require("express");
const handlebarsConfig = require("./handlebarsConfig");
const middlewares = require("./middlewares");
const route = require("./routes");
const browserSync = require("browser-sync");
const { connectDB } = require("./app/database/db");
const sessionMiddleware = require("./app/middleware/sessionMiddleware");
require("dotenv").config();

const app = express();

// Middleware
middlewares(app);
// Sử dụng middleware cho tất cả các route
app.use(sessionMiddleware);

// Kết nối Database
connectDB();

// Cấu hình Handlebars
handlebarsConfig(app);

// Routes
route(app);

// Port và chế độ môi trường
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Chỉ bật BrowserSync khi ở chế độ development
  if (isDev) {
    browserSync.init({
      proxy: `http://localhost:${port}`,
      files: ["**/*.*"],
      port: 3001,
      open: false,
      reloadOnRestart: true,
    });
  }
});
