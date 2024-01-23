const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController'); // Import the controller
const { User } = require('../models'); // Import your User model

// Routes using the methods defined in userController.
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password // Ensure you have password hashing in place
        });
        // After signup, redirect to the login page
        res.redirect('/login');
        // Alternatively, send a JSON response
        // res.json({ message: 'Signup successful' });
    } catch (error) {
        // Handle errors
        res.status(500).json(error);
    }
});

// Ensure that the dashboard and updateProfile methods are defined in your userController.
// If they are not, either implement them or remove these routes.
router.get('/dashboard', withAuth, userController.dashboard); // Include only if dashboard method is implemented in userController
router.put('/update-profile', withAuth, userController.updateProfile); // Include only if updateProfile method is implemented in userController

module.exports = router;
