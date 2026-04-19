const express = require("express");
const mongoose = require("mongoose");

const logger = require("./requestLogger");
const sanitize = require("./sanitize");
const { verifyMFA } = require("./mfaMiddleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use(sanitize);

// Public route
app.get("/", (req, res) => {
  res.send("API running");
});

// Protected route (Exercise 2)
app.get("/secure", verifyMFA, (req, res) => {
  res.json({ message: "Secure route accessed", user: req.user });
});

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/local")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});