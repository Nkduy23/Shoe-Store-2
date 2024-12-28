const fs = require("fs");
const path = require("path");

function route(app) {
  const routeFiles = fs.readdirSync(__dirname);
  routeFiles.forEach((file) => {
    if (file !== "index.js") {
      const route = require(path.join(__dirname, file));
      const routeName = file.replace(".js", "");
      app.use(`/${routeName}`, route);
    }
  });
}

module.exports = route;
