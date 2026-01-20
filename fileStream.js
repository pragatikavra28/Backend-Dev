//Read Stream

// const fs = require('fs');
// const readStream = fs.createReadStream('./sample.txt', { encoding: 'utf8', highWaterMark: 64 * 1024 }); //64KB

// readStream.on('data', (chunk) => {
//     console.log('Received chunk:', chunk.length);
// });
// readStream.on('end', () => {
//     console.log('file read successfully.');
// });

//Write Stream (write data to a file in chunks)

//const fs = require('fs');
// const writeStream = fs.createWriteStream('./sample.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 }); //16KB
// writeStream.write("Hello,GLA University\n");
// writeStream.write("Welcome to Node.js File System Module\n");
// writeStream.write("This is an example of Write Stream\n");
// writeStream.end("File write operation completed.\n");
// writeStream.end();

//create a file and write data to it using write stream
// const fs = require('fs');
// const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf8', highWaterMark: 16 * 1024 }); //16KB    
// writeStream.write("This is the first line of the output file.\n");
// writeStream.write("This is the second line of the output file.\n");
// writeStream.write("This is the third line of the output file.\n");
// writeStream.end("File write operation completed.\n");
// writeStream.on('finish', () => {
//     console.log('Data written to file successfully.');
// });


//Transform Stream (modify data while reading and writing)
// const fs = require('fs');
// const { Transform } = require('stream');
// const upperCaseTransform = new Transform({
//     transform(chunk, encoding, callback) {
//     const modifiedData = chunk.toString().toUpperCase();
//     this.push(modifiedData);
//     callback(); //indicate that the transformation is complete
//     }
// });

// //pipe flow from read stream to transform stream to write stream
// fs.createReadStream('./sample.txt', { encoding: 'utf8' })
//     .pipe(upperCaseTransform) // transform stream into the pipeline
//     .pipe(fs.createWriteStream('./output.txt'));


 //filecopy using pipe method from sample file to output file
 
    const fs = require('fs');
    const readStream = fs.createReadStream('./sample.txt');
    const writeStream = fs.createWriteStream('./output.txt');
    readStream.pipe(writeStream);
    console.log('File copied successfully using pipe method.');

    