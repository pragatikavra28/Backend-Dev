const fs = require("fs");

fs.copyFile("important.txt", "important_backup.txt", () => {
  console.log("Backup completed");
});
