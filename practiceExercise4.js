const fs = require("fs");

const folder = "./files";
const sevenDays = 7 * 24 * 60 * 60 * 1000;

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    const filePath = folder + "/" + file;

    fs.stat(filePath, (err, stats) => {
      const age = Date.now() - stats.mtimeMs;

      if (age > sevenDays) {
        fs.unlink(filePath, () => {
          console.log("Deleted:", file);
        });
      }
    });
  });
});
