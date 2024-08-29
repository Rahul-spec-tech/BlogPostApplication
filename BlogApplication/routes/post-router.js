const express = require('express');
const router = express.Router();
//const Post = require('../models/Post');
const postController = require('../models/controllers/post-controller');
const { auth } = require('../middleware/auth-middleware.js');

// Create a new Blog Post
router.post('/add_post', auth, postController.createPost);

// Getting Post By Id
router.get('/get_post/:id', auth, postController.getPostById);

// Getting All the Posts
router.get('/get_posts', auth, postController.getAllPosts);

// Updating Post By Id
router.put('/update_post/:id', auth, postController.updatePostById);

// Deleting Post By Id
router.delete('/delete_post/:id', auth, postController.deletePostById);

module.exports = router;
