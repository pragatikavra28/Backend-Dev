//const fs= require ('fs');
// // create file with synchronous way
// fs.writeFileSync('example.txt','Hello from Node.js');
// const data=fs.readFileSync('example.txt','utf-8');
// console.log(data);
 // utf-8 is a character encoding standard which is used to represent text in computers.it tells the computer how to convert bytes into characters.
// //Asynchronous way to read file
//  fs.readFile("./example.txt", "utf-8" ,(err,result)=>
// {
//     if(err){
//         console.error('Error reading files:',err);

//     }
//     else{
//         console.log("File content",result);
//     }
// });

// fs.appendFileSync('example.txt','${Date.now()} Hey there! \n');

// Node js archictecture is single threaded event loop based architecture. It uses non blocking I/O model which makes it lightweight and efficient.
// console.log("Appended Successfully");
// fs.renameSync('example.txt','sample.txt');
// console.log("Renamed Successfully");
// fs.unlinkSync('sample.txt');
// console.log("Deleted Successfully");
// fs module in Node.js provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
// It allows you to perform various file operations such as reading, writing, updating, deleting, and renaming files and directories.
// The fs module can be used in both synchronous and asynchronous ways, providing flexibility for different use cases.
// Some commonly used methods in the fs module include:
// fs.readFile() - Reads the contents of a file.
// fs.writeFile() - Writes data to a file, replacing the file if it already exists.
// fs.appendFile() - Appends data to a file, creating the file if it does not exist.
// fs.unlink() - Deletes a file.
// fs.rename() - Renames a file or directory.
// fs.mkdir() - Creates a new directory.
// fs.readdir() - Reads the contents of a directory.
// fs.stat() - Retrieves information about a file or directory.
//fs.statSync() - Synchronously retrieves information about a file or directory.
// These are just a few examples, and the fs module provides many more methods for working with the file system in Node.js.

// const os=require('os');
// const fs=require('fs');
// console.log(os.cpus().length);


//make a folder and 2 subfolder in it using fs module and a file in it
 
// const fs=require('fs');
// fs.mkdirSync('parentFolder');
// fs.mkdirSync('parentFolder/childFolder1');
// fs.mkdirSync('parentFolder/childFolder2');
// fs.writeFileSync('parentFolder/childFolder1/info.txt','This is a file inside childFolder1');
// console.log("Folders and file created successfully"); 

// another example 
// const { log } = require("console");
// const fs=require("fs");
// using fs using callback function 
// const promises= require("fs").promises;

// create a file with SYNC function 
// fs.writeFileSync("./file.txt","welcome to GLA"); //string values //blocking case  //executing without error or callback function 

// async function
//fs.writeFile("./file.txt","welcome to gla university",(err)=>{});  //void functions //non blocking  // we are showing an error 

//Read file with sync function'
// const result=fs.readFileSync("./notes.txt","utf8"); // utf8 to encode and decode our files 
// console.log(result);


//asyn
// const result=fs.readFile("./notes.txt","utf8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
        
//     }
//     else{
//         console.log(result);
        
//     }
// });

//to see when this file is made 
//fs.appendFileSync("./file.txt",new Date().getDate().toLocaleString());
//fs.appendFileSync("./file.txt",`${Date.now()}heyy shreyal\n`) //ip address type of date only read by the server , with the dates files are added automatically 
//for pc we see the path module 

//copy file 
//fs.cpSync("./file.txt","./file_copy.txt");

//to delete the copied file 
//fs.unlinkSync("./file_copy.txt");

// console.log(fs.statSync("./file.txt")); //to see all the details of the file 

//console.log(fs.statSync("./file.txt").isFile()); //too see if it is a file or the name of the file is there or not 


// now to create dictory 
// fs.mkdirSync("./hello folder");

// fs.mkdirSync("./hello folder/hii folder");
// fs.writeFileSync("hello folder/hii folder/index.txt","welcome to my flders");

//remove directory 
//fs.rmdirSync("./hello folder ")


//to see all the files we have made in the folder we are working onn 
fs.readdir("./",(err,files)=>{
    if(err)
    {
        console.log("error",err);
        
    }
    else{
        console.log("files",files);
        
    }
});

//Read nodejs architecture is single threaded event loop based architecture. It uses non blocking I/O model which makes it lightweight and efficient.

//blocking vs non blocking
//blocking - when a function is called the program execution stops until the function returns a result 
//non blocking - when a function is called the program execution continues without waiting for the function to return a result

//Blocking operations are generally easier to understand and debug, but they can lead to performance issues in applications that require high concurrency or responsiveness.
//Non-blocking operations can improve performance and responsiveness, but they can also introduce complexity and make debugging more challenging.
//code example of blocking vs non blocking
const fs=require("fs");
console.log("Program Started");
//blocking code
// const result=fs.readFileSync("./file.js","utf8");
// console.log(result);
console.log("Program Ended");
const result=fs.readFile("./file.js","utf8");
console.log(result);vvvvvvvvv