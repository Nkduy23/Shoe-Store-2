const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const { sessionConfig } = require("./app/config/config"); // Import cấu hình từ config.js
require("dotenv").config();

module.exports = (app) => {
  // Serve static files
  app.use(express.static(path.join(__dirname, "public")));
  app.use(morgan("dev")); // Ghi log HTTP request
  app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu form
  app.use(express.json()); // Xử lý dữ liệu JSON
  app.use(flash()); // Hiển thị thông báo flash

  // Cấu hình session với MongoDB store
  app.use(
    session({
      ...sessionConfig, // Sử dụng cấu hình từ config.js
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // URL kết nối MongoDB
        collectionName: "sessions", // Collection để lưu session
        ttl: 24 * 60 * 60, // Thời gian sống của session (1 ngày)
      }),
    })
  );
};
