const { Post } = require('../models');

const postController = {
    // Action to retrieve all posts
    getAllPosts: async (req, res) => {
        try {
            const postData = await Post.findAll();
            res.json(postData);
        } catch (error) {
            console.error('Error getting posts:', error);
            res.status(500).json(error);
        }
    },

    // Action to create a new post
    createPost: async (req, res) => {
        try {
            const postData = await Post.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.session.userId // Assumes user id is stored in session
            });

            res.status(200).json(postData);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json(error);
        }
    },

};

module.exports = postController;
