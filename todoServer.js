const http = require('http');
const url = require('url');

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // READ
  if (parsedUrl.pathname === '/todos' && method === 'GET') {
    res.end(JSON.stringify(todos));
  }

  // CREATE
  else if (parsedUrl.pathname === '/todos' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const todo = JSON.parse(body);
      todo.id = id++;
      todos.push(todo);
      res.end(JSON.stringify(todo));
    });
  }

  // UPDATE
  else if (parsedUrl.pathname.match(/\/todos\/\d+/) && method === 'PUT') {
    const todoId = parseInt(parsedUrl.pathname.split('/')[2]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updated = JSON.parse(body);
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        todo.task = updated.task;
        res.end(JSON.stringify(todo));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Todo not found' }));
      }
    });
  }

  // DELETE
  else if (parsedUrl.pathname.match(/\/todos\/\d+/) && method === 'DELETE') {
    const todoId = parseInt(parsedUrl.pathname.split('/')[2]);
    todos = todos.filter(t => t.id !== todoId);
    res.end(JSON.stringify({ message: 'Todo deleted' }));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('TODO API running at http://localhost:3000');
});
