const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const withAuth = require('../middleware/authMiddleware');

// Import your User model
const { User } = require('../models');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
            // Add other user fields as needed
        });

        // Set up session variables here, if using sessions
        // req.session.user = ...

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error signing up' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }

        // Compare hashed password
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }

        // Set session variables here
        // req.session.user = ...

        res.json({ message: 'You are now logged in' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    // Destroy session/log user out
    // req.session.destroy(...);
    res.json({ message: 'You are now logged out' });
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
    // Logic to display the dashboard, typically fetching user-specific data
    // ...
});

// Update user profile
router.put('/update-profile', withAuth, async (req, res) => {
    // Logic to update user profile
    // ...
});

module.exports = router;
