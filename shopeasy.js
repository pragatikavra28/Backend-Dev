import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(session({
  secret: 'secret',
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/shop' }),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1800000 }
}));

app.post('/search', async (req, res) => {
  const { name } = req.body;
  const data = await mongoose.connection.collection('products')
    .find({ name: { $regex: name, $options: 'i' } }).toArray();
  res.json(data);
});

app.post('/review', (req, res) => {
  res.send(req.body.text);
});

app.listen(8000, () => {
  console.log("Server started");
});