// const http =require("http");
// // plain text
// const server=http.createServer((req,res)=>{


// res.writeHead(200,{
//     "content-type":"plain/text",
// });
// res.end("hello");
// });
// server.listen(8000,()=>{
//     console.log("server is running");

// });


//How to render HTML page  using Node.js ?

// const http1 =require("http");
// const server1=http1.createServer((req,res)=>{
// if(req.url==="/home"){
//     res.writeHead(200,{
//         "content-type":"text/html",
//     });
//     res.end("<h1>Hello World</h1><p>This is my home page using Node.js</p>");
// }
// else if(req.url==="/about"){
//     res.writeHead(200,{
//         "content-type":"text/html",
//     });
//     res.end("<h1>About Page</h1><p>This is the about page of my first server using Node.js</p>");
// }
// });
// server1.listen(8001,()=>{
//     console.log("server is running on port 8001");
// });


// JS Object => we pass the value in key value pair
 
const http =require("http");
let user={
    username:"pragati",
    email:"pragati@example.com",
}

//JSON.stringify(user); //converts JS object to JSON 
//JSON.parse() //converts JSON to JS object

const server=http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type":"application/json",
    });
    res.end(JSON.stringify({message:"user data fetched successfully",user:user}));
});

server.listen(8000,()=>{
    console.log("server is running on port 8000");
});


