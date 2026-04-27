import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

function encrypt(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

app.get('/record/:id', (req, res) => {
  if (req.user?.id !== req.params.id)
    return res.status(403).send('Unauthorized');
  res.send('Record data');
});

app.post('/patient', (req, res) => {
  const safe = req.body.name.replace(/[^a-zA-Z ]/g, '');
  res.send(safe);
});

app.listen(8000, () => {
  console.log("Server started");
});