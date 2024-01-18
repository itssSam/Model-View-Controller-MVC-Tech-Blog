const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/authMiddleware');

// Import your Comment model
const { Comment } = require('../models');

// Route to add a comment
router.post('/add', withAuth, async (req, res) => {
    try {
        // Assuming req.body contains commentText and postId
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            postId: req.body.postId,
            // Assuming req.session contains userId of the logged-in user
            userId: req.session.userId
        });

        res.status(200).json(newComment);
    } catch (error) {
        console.error('Failed to add comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;
