const { Comment } = require('../models');

const commentController = {
    // Action to add a comment
    addComment: async (req, res) => {
        try {
            const commentData = await Comment.create({
                commentText: req.body.commentText,
                userId: req.session.userId, // Assumes user id is stored in session
                postId: req.body.postId
            });

            res.status(200).json(commentData);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json(error);
        }
    },

};

module.exports = commentController;
