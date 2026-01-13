//AboutPage

const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {
    let responseText="";
    switch(req.url) {
        case "/":
            responseText = "Welcome to the Home Page";
            break;
        case "/about":
            responseText = "This is the About Page";
            break;
        case "/contact":
            responseText = "This is the Contact Page";
            break;
        default:
            responseText = "404 Page Not Found";
            break;
    }
    const message = responseText;


    const log = `${new Date.now()} | ${req.url} - ${responseText}\n`;

    fs.appendFile("log.txt", log, (err) => {
        if (err) console.error("Log error:", err);
    });
    res.end(message);
});

myserver.listen(8000, 'localhost', () => console.log('Server is running on port 8000'));
