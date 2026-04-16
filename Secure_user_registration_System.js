const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [];

// Password Validation Function
function validatePassword(password) {
    // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
}

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check missing fields
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Check duplicate user
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Validate password
        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user
        users.push({
            username,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});