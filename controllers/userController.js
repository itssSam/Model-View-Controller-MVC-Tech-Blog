const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
    // Action for user signup
    signup: async (req, res) => {
        try {
            const userData = await User.create({
                username: req.body.username,
                password: req.body.password // password will be hashed in the model hook
            });

            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json(error);
        }
    },

    // Action for user login
    login: async (req, res) => {
        try {
            const userData = await User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (!userData) {
                res.status(400).json({ message: 'Incorrect username or password, please try again' });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect username or password, please try again' });
                return;
            }

            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json(error);
        }
    },

    // Action for user logout
    logout: (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },
    // Add these methods to your userController

    dashboard: async (req, res) => {
        // Logic for displaying the user dashboard
        // For example, fetching user-specific data from the database and sending it to the dashboard view
        try {
            // Assuming you have a method to get user data
            const userData = await User.findById(req.session.userId);
            res.render('dashboard', { user: userData });
        } catch (error) {
            console.error('Error loading dashboard:', error);
            res.status(500).json({ message: 'Error loading dashboard' });
        }
    },

    updateProfile: async (req, res) => {
        // Logic for updating the user's profile
        try {
            const updatedUser = await User.update(req.body, {
                where: {
                    id: req.session.userId
                }
            });
            res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'Error updating profile' });
        }
    }
};



module.exports = userController;
