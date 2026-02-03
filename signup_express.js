// // const http = require("http");
// // const fs = require("fs");
// // const url = require("url");
// // const myServer = http.createServer((req, res) => {
// //   if (req.url === "/favicon.ico") return res.end();
// //   const log = `${Date.now()}: ${req.method}  ${req.url} New Req Received\n`;
// //   const myUrl = url.parse(req.url, true);
// //   fs.appendFile("log.txt", log, (err, data) => {
// //     switch (myUrl.pathname) {
// //       case "/":
// //         if (req.method === "GET") res.end("Home Page");
// //         break;
// //       case "/about":
// //         const username = myUrl.query.myname;
// //         res.end(`Hi, ${username}`);
// //         break;
// //       case "/search":
// //         const search = myUrl.query.search_query;
// //         res.end("Here are your results for " + search);
// //         break;
// //       case "/signup":
// //         if (req.method === "GET") res.end("This is a signup form");
// //         else if (req.method === "POST") {
// //           // DB Query
// //           res.end("Success");
// //         }
// //         break;
// //       default:
// //         res.end("404 Not Found");
// //     }
// //   });
// // });
// // myServer.listen(8000, () => console.log("Server Started"));

// //    const http =require("http");
// const express = require("express");
// const app = express();
// app.get("/", (req, res) => {
//   return res.send("home page");
// });
// // app.get("/about",(req,res)=>{
// // return res.send("about page");
// // });;
// // const name = req.query.name;
// // const age = req.query.age;
// app.get("/about", (req, res) => {
//   return res.send(
//     "About page" + "Hey" + req.query.name + "age is" + req.query.age,
//   );
// });
// // const myServer=http.createServer(app);
// //myServer.listen(8000,()=>console.log("server started"));
// app.listen(8000, () => console.log("server started"));

//Registration page

const express=require("express");
    const app=express();
    app.use(express.json());
    app.get("/",(req,res)=>{
     return res.send("home page");
    });
    app.get("/attendance",(req,res)=>{
      const name=req.query.name;
      const present=req.query.present;
      res.send(`Attendance recorded: Name = ${name}, Present = ${present}`);
      });
        