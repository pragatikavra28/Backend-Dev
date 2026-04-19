const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/requests.log");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const log = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms\n`;

    fs.appendFile(logFilePath, log, (err) => {
      if (err) console.error("Logging error:", err);
    });
  });

  next();
};

module.exports = requestLogger;