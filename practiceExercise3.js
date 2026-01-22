const fs = require("fs");

const time = Date.now();
const backupFile = "data_" + time + ".txt";

fs.copyFile("data.txt", backupFile, () => {
  console.log("Backup created");
});
