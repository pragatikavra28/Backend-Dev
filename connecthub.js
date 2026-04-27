import express from 'express';
import sanitizeHtml from 'sanitize-html';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.post('/post', (req, res) => {
  const clean = sanitizeHtml(req.body.content, {
    allowedTags: ['b','i','a'],
    allowedAttributes: { a: ['href'] }
  });
  res.send(clean);
});

app.post('/register', (req, res) => {
  if (!req.body.email.includes('@'))
    return res.status(400).send('Invalid');
  res.send('OK');
});

app.listen(8000, () => {
  console.log("Server started");
});