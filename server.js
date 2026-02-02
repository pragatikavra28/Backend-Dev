const http=require('http');
const fs=require('fs');

const myserver=http.createServer((req,res)=>{
//     //console.log('new Request recieved');
//     //console.log("new req Rec."")
//    // res.end('hello from server');
//    //console.log(req);

//    const log = `${Date.now()} - ${req.method} ${req.url}\n`;
//    console.log(log.trim());
//    fs.appendFile("log.txt", log, (err) => {
//          if(err) throw err;
//    });
   res.end('hello from server. This is pragati Kavra');
// 
});

myserver.listen(8000,'localhost', () => console.log('Server is running on port 8000'));