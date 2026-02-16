const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;



// Parse form data
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("public"));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Response Time Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - ${Date.now() - start}ms`);
  });
  next();
});



let users = [
  { id: 1, name: "Ishu" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Aman" }
];

let posts = [
  { id: 1, title: "First Post", content: "Hello World" }
];



// HOME
app.get("/", (req, res) => {
  res.redirect("/users");
});


app.get("/users", (req, res) => {
  const { name } = req.query;

  let filteredUsers = users;

  if (name) {
    filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.render("users", { users: filteredUsers });
});


app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("Form Submitted Successfully!");
});


app.get("/gallery", (req, res) => {
  const images = ["photo1.jpg", "photo2.jpg"];
  res.render("gallery", { images });
});



// List posts
app.get("/posts", (req, res) => {
  res.render("posts", { posts });
});

// New post form
app.get("/posts/new", (req, res) => {
  res.render("newPost");
});

// Create post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    content
  });

  res.redirect("/posts");
});

// Single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.render("404");

  res.render("post", { post });
});

app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
