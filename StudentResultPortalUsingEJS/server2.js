const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// In-memory student list
let students = [
  { id: 1, name: "Ishu", marks: 85, grade: "A" },
  { id: 2, name: "Rahul", marks: 45, grade: "C" },
  { id: 3, name: "Aman", marks: 30, grade: "D" }
];

/* ==============================
   GET /students
============================== */
app.get("/students", (req, res) => {
  res.render("students", { students });
});

/* ==============================
   GET /students/:id
============================== */
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.send("Student not found");
  }

  res.render("student", { student });
});

/* ==============================
   GET /add-student
============================== */
app.get("/add-student", (req, res) => {
  res.render("addStudent");
});

/* ==============================
   POST /add-student
============================== */
app.post("/add-student", (req, res) => {
  const { name, marks, grade } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    marks: parseInt(marks),
    grade
  };

  students.push(newStudent);

  res.redirect("/students");
});

/* ==============================
   Start Server
============================== */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
