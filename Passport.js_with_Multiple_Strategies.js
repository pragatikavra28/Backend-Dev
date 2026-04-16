const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
    secret: 'passport-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const JWT_SECRET = 'jwt-secret';

// Dummy users
const users = [
    { id: 1, username: "user1", password: "1234" }
];

// Serialize / Deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});


// 🔐 Local Strategy (Session-based login)
passport.use('local', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = users.find(u => u.username === username);

            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            if (user.password !== password) {
                return done(null, false, { message: "Invalid password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// 🔑 JWT Strategy (Token-based auth)
passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    (payload, done) => {
        try {
            const user = users.find(u => u.id === payload.id);

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }
));


// 🟢 Session Login (Local Strategy)
app.post('/auth/login',
    passport.authenticate('local'),
    (req, res) => {
        res.json({ message: "Logged in with session", user: req.user });
    }
);


// 🔵 API Login (JWT)
app.post('/auth/api-login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({
        message: "JWT generated",
        token
    });
});


// 🛡️ Session Protected Route
app.get('/dashboard',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Login required" });
        }
        next();
    },
    (req, res) => {
        res.json({
            message: "Welcome to dashboard",
            user: req.user
        });
    }
);


// 🔐 JWT Protected Route
app.get('/api/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            message: "Profile data",
            user: req.user
        });
    }
);


// 🔄 Switch Auth Method Info Route
app.get('/auth/method', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ method: "session", user: req.user });
    }
    return res.json({ method: "token or not authenticated" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});