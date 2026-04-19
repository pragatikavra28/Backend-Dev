const xss = require("xss");

const sanitizeInput = (obj) => {
  if (typeof obj === "string") {
    return xss(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeInput);
  } else if (typeof obj === "object" && obj !== null) {
    const sanitized = {};
    for (let key in obj) {
      sanitized[key] = sanitizeInput(obj[key]);
    }
    return sanitized;
  }
  return obj;
};

const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  req.query = sanitizeInput(req.query);
  req.params = sanitizeInput(req.params);

  next();
};

module.exports = sanitizeMiddleware;