const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());


const users = [
  { id: 1, email: "admin@gmail.com", password: "1234", role: "Admin" },
  { id: 2, email: "user@gmail.com", password: "abcd", role: "User" }
];


let activeTokens = [];

app.get("/users", (req, res) => {
  res.json(users);
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

 
  const token = `token-${user.id}-${Date.now()}`;

  activeTokens.push(token);

  res.json({
    message: "Login successful",
    token
  });
});


const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Token missing"
    });
  }

  if (!activeTokens.includes(token)) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token"
    });
  }

  next();
};


app.get("/dashboard", authenticate, (req, res) => {
  res.json({
    message: "Welcome to Dashboard! 🔐"
  });
});

app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "This is your profile data 👤"
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
