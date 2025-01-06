const dotenv = require("dotenv");

// Load biến môi trường từ .env
dotenv.config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "defaultSecretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" }, // Cookie bảo mật khi chạy production
};

module.exports = { sessionConfig };
