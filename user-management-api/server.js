const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


let users = [
  { id: 1, name: "Ishu", email: "ishu@gmail.com", role: "Admin" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "Employee" }
];


const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);



const validateUser = (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: "Invalid input. name, email and role are required."
    });
  }

  next();
};




app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});


app.post("/users", validateUser, (req, res) => {
  const { name, email, role } = req.body;

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});


app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, role } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  res.json({
    message: "User updated successfully",
    user
  });
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  res.json({ message: "User deleted successfully" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
