const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'auth-secret',
    resave: false,
    saveUninitialized: false
}));

const users = [
    { id: 1, username: "user1", role: "user" },
    { id: 2, username: "mod1", role: "moderator" },
    { id: 3, username: "admin1", role: "admin" }
];

const posts = [];

// Middleware: Authentication
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized: Please login" });
    }
    next();
};

// Middleware: Role-based Authorization
const requireRole = (role) => {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const rolesHierarchy = ["user", "moderator", "admin"];

        if (rolesHierarchy.indexOf(user.role) < rolesHierarchy.indexOf(role)) {
            return res.status(403).json({
                message: `Forbidden: Requires ${role} role`
            });
        }

        next();
    };
};

// Middleware: Owner or Moderator/Admin
const isOwnerOrModerator = (req, res, next) => {
    const user = req.session.user;
    const postId = parseInt(req.params.id);

    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (
        post.userId === user.id ||
        user.role === "moderator" ||
        user.role === "admin"
    ) {
        req.post = post;
        return next();
    }

    return res.status(403).json({
        message: "Forbidden: Not allowed to modify this post"
    });
};

// Create Post
app.post('/posts', isAuthenticated, (req, res) => {
    const { content } = req.body;

    const newPost = {
        id: posts.length + 1,
        content,
        userId: req.session.user.id
    };

    posts.push(newPost);

    res.status(201).json({
        message: "Post created",
        post: newPost
    });
});

// Update Post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
    const { content } = req.body;

    req.post.content = content;

    res.json({
        message: "Post updated",
        post: req.post
    });
});

// Delete Post (Moderator+)
app.delete('/posts/:id',
    isAuthenticated,
    requireRole('moderator'),
    (req, res) => {

        const postId = parseInt(req.params.id);
        const index = posts.findIndex(p => p.id === postId);

        if (index === -1) {
            return res.status(404).json({ message: "Post not found" });
        }

        posts.splice(index, 1);

        res.json({ message: "Post deleted" });
});

// Dummy login route (for testing)
app.post('/login', (req, res) => {
    const { username } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.session.user = user;

    res.json({ message: "Logged in", user });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});