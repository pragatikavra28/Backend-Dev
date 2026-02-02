const http =require("http");
const server=http.createServer((req,res)=>{
    res.end("Hello Server");
});
server.listen(9000,"localhost",()=>console.log("server is running on port 8000"));