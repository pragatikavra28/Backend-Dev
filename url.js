const url= require('url');
const http= require('http');

const server= http.createServer((req, res) => {
    const parsedUrl= url.parse(req.url, true);
    console.log(parsedUrl);

    switch(parsedUrl.pathname){
        case '/':
            res.end('Home Page');
            break;
        case '/about':
           // const qp=res.end('About Page');
            const username= parsedUrl.query.username;
        
            res.end('Hi, ' + username + '! Welcome to the About Page.');
            break;
        default:
            res.end('404 Page Not Found');
            break;
    }
});

server.listen(8000, () => {
    console.log('Server started on port 8000');
});