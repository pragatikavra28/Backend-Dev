const express = require("express");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(express.json());

// DB connect
connectDB();

// routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log("Server started.."));