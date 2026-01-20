// why do we need path module ? 
//path module is used to work with file and directory paths. It provides utilities for handling and transforming file paths in a way that is consistent across different operating systems.
 
//"c:/Users/91766/Backend-Dev/path.js"
//Path2D.join("User","91766","Backend-Dev","path.js");
//output:c:/Users/91766/Backend-Dev/path.js

// const path=require('path');

// const filePath="/user/admin/docs/report.pdf";
// console.log(path.basename(filePath)); //report.pdf

const path = require("path");

console.log("File name:", path.basename(__filename));
console.log("Folder name:", path.dirname(__filename));
console.log("Extension:", path.extname(__filename));

const fullPath = path.join(__dirname, "public", "index.html");
console.log("Full Path:", fullPath);
