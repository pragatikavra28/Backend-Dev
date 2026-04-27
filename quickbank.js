import express from 'express';
import speakeasy from 'speakeasy';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json());

app.use(rateLimit({
  windowMs: 60000,
  max: 10
}));

app.post('/transfer', (req, res) => {
  const { amount, token } = req.body;

  if (amount <= 0 || amount > 100000)
    return res.status(400).send('Invalid amount');

  if (amount > 1000) {
    const verified = speakeasy.totp.verify({
      secret: req.user.secret,
      encoding: 'base32',
      token
    });

    if (!verified)
      return res.status(403).send('2FA failed');
  }

  res.send('Transfer successful');
});

app.listen(8000, () => {
  console.log("Server started");
});