const fs = require("fs");

fs.readFile("data.json", "utf8", (err, data) => {
  const obj = JSON.parse(data);
  console.log(obj);
});
