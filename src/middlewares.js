const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const { sessionConfig } = require("./app/config/config"); // Import cấu hình session từ config.js
require("dotenv").config();

module.exports = (app) => {
  // ---------------------------- Serve Static Files ----------------------------
  // Cung cấp các tệp tĩnh như hình ảnh, CSS, JS từ thư mục 'public'
  app.use(express.static(path.join(__dirname, "public")));

  // ---------------------------- HTTP Request Logging ----------------------------
  // Ghi lại các HTTP request vào console trong chế độ phát triển
  app.use(morgan("dev"));

  // ---------------------------- Parse Incoming Requests ----------------------------
  // Xử lý dữ liệu form (application/x-www-form-urlencoded)
  app.use(express.urlencoded({ extended: true }));
  // Xử lý dữ liệu JSON (application/json)
  app.use(express.json());

  // ---------------------------- Flash Messages ----------------------------
  // Cho phép hiển thị thông báo flash cho người dùng (ví dụ: thông báo thành công, lỗi, v.v.)
  app.use(flash());

  // ---------------------------- Session Configuration ----------------------------
  // Cấu hình session sử dụng MongoDB để lưu trữ dữ liệu session
  app.use(
    session({
      ...sessionConfig, // Sử dụng cấu hình session từ file config.js
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // URL kết nối MongoDB từ biến môi trường
        collectionName: "sessions", // Tên collection để lưu trữ session
        ttl: 24 * 60 * 60, // Thời gian sống của session (1 ngày)
      }),
    })
  );
};
