const fs = require("fs"); // Module để đọc file
const path = require("path"); // Module xử lý đường dẫn

function route(app) {
  // Đọc tất cả các file trong thư mục hiện tại (routes)
  const routeFiles = fs.readdirSync(__dirname);

  // Duyệt qua từng file
  routeFiles.forEach((file) => {
    // Bỏ qua file 'index.js' để tránh lỗi lặp
    if (file !== "index.js") {
      // Import từng route
      const route = require(path.join(__dirname, file));

      // Lấy tên file để làm tên route (bỏ phần mở rộng .js)
      const routeName = file.replace(".js", "");

      // Hoặc có thể dùng cách
      // Đăng ký '/' cho file 'home.js'
      //  if (routeName === 'home') {
      //     app.use('/', route); // Giữ nguyên '/' cho home
      // } else {
      //     app.use(`/${routeName}`, route);
      // }

      // Đăng ký route động, ví dụ: '/home', '/about'
      app.use(`/${routeName}`, route);
    }
  });
}

module.exports = route;
