const Handlebars = require("handlebars");

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  // Kiểm tra nếu v1 hoặc v2 là null hoặc undefined
  if (v1 == null || v2 == null) {
    return options.inverse(this);
  }

  const operators = {
    "==": (a, b) => a == b,
    "===": (a, b) => a === b,
    "!=": (a, b) => a != b,
    "!==": (a, b) => a !== b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
  };

  // Kiểm tra toán tử hợp lệ
  if (operators.hasOwnProperty(operator)) {
    return operators[operator](v1, v2) ? options.fn(this) : options.inverse(this);
  }

  // Trả về inverse nếu toán tử không hợp lệ
  return options.inverse(this);
});
