const fs = require("fs");

fs.readdir(".", (err, items) => {
  items.forEach(item => {
    fs.stat(item, (err, stats) => {
      if (stats.isDirectory()) {
        console.log("Folder:", item);
      } else {
        console.log("File:", item, "Size:", stats.size);
      }
    });
  });
});
