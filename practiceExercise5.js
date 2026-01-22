const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("file.txt");
const writeStream = fs.createWriteStream("file.txt.gz");
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

console.log("File compressed");
