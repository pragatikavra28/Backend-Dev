const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize Cart Middleware
const initCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
};

// Apply middleware to all cart routes
app.use('/cart', initCart);

// Add item to cart
app.post('/cart/add', (req, res) => {
    const { productId, name, price, quantity } = req.body;

    if (!productId || !name || !price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const existingItem = req.session.cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity || 1;
    } else {
        req.session.cart.push({
            productId,
            name,
            price,
            quantity: quantity || 1
        });
    }

    res.json({ message: "Item added to cart", cart: req.session.cart });
});

// Update item quantity
app.put('/cart/update/:productId', (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    const item = req.session.cart.find(i => i.productId === productId);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    if (quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    item.quantity = quantity;

    res.json({ message: "Cart updated", cart: req.session.cart });
});

// Remove item
app.delete('/cart/remove/:productId', (req, res) => {
    const { productId } = req.params;

    const index = req.session.cart.findIndex(i => i.productId === productId);

    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }

    req.session.cart.splice(index, 1);

    res.json({ message: "Item removed", cart: req.session.cart });
});

// Get cart with total price
app.get('/cart', (req, res) => {
    const cart = req.session.cart;

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    res.json({
        cart,
        totalPrice
    });
});

// Clear cart
app.delete('/cart/clear', (req, res) => {
    req.session.cart = [];
    res.json({ message: "Cart cleared" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});