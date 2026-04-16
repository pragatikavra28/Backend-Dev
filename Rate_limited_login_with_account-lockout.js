const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [
    // Pre-hashed password for demo (password: "1234")
    { email: "test@example.com", password: "$2b$10$WzQeZ1z3vFQ9Z8F7lQK1F.8R6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6ZzZ6" }
];

// email -> { count, lockUntil, firstAttemptTime }
const loginAttempts = new Map();

const MAX_ATTEMPTS = 5;
const WINDOW_TIME = 60 * 60 * 1000; // 1 hour
const LOCK_TIME = 30 * 60 * 1000;   // 30 minutes


// ✅ Check login attempts
function checkLoginAttempts(email) {
    const attempt = loginAttempts.get(email);

    if (!attempt) return { allowed: true };

    // If account is locked
    if (attempt.lockUntil && Date.now() < attempt.lockUntil) {
        return {
            allowed: false,
            message: `Account locked. Try again after ${Math.ceil((attempt.lockUntil - Date.now()) / 60000)} minutes`
        };
    }

    // Reset if window expired
    if (Date.now() - attempt.firstAttemptTime > WINDOW_TIME) {
        loginAttempts.delete(email);
        return { allowed: true };
    }

    // Check attempts count
    if (attempt.count >= MAX_ATTEMPTS) {
        return {
            allowed: false,
            message: "Too many login attempts. Account temporarily locked."
        };
    }

    return { allowed: true };
}


// ❌ Record failed attempt
function recordFailedAttempt(email) {
    let attempt = loginAttempts.get(email);

    if (!attempt) {
        attempt = {
            count: 1,
            firstAttemptTime: Date.now(),
            lockUntil: null
        };
    } else {
        attempt.count++;

        if (attempt.count >= MAX_ATTEMPTS) {
            attempt.lockUntil = Date.now() + LOCK_TIME;
        }
    }

    loginAttempts.set(email, attempt);
}


// 🔄 Clear attempts after success
function clearAttempts(email) {
    loginAttempts.delete(email);
}


// 🔐 LOGIN ROUTE
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check rate limit
    const check = checkLoginAttempts(email);
    if (!check.allowed) {
        return res.status(429).json({ message: check.message });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        recordFailedAttempt(email);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        recordFailedAttempt(email);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success
    clearAttempts(email);

    res.json({ message: "Login successful" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});