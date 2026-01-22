const fs = require("fs");

function log(message) {
  const time = new Date().toLocaleString();
  const logMsg = time + " : " + message + "\n";

  fs.appendFile("log.txt", logMsg, () => {});
}

log("Program started");
log("User logged in");
