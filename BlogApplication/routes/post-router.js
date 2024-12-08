const express = require('express');
const router = express.Router();
//const Post = require('../models/Post');
const postController = require('../controllers/post-controller.js');
const { auth, adminAuth } = require('../middleware/auth-middleware.js');

// Create a new Blog Post
router.post('/add_post', auth, postController.createPost);

// Getting Post By Id
router.get('/get_post/:id', auth, adminAuth, postController.getPostById);

// Getting All the Posts
router.get('/get_posts', auth, postController.getAllPosts);

// Updating Post By Id
router.put('/update_post/:id', auth, postController.updatePostById);

// Deleting Post By Id
router.delete('/delete_post/:id', auth, postController.deletePostById);

//Admin: Getting all posts
router.get('/admin/get_all_posts', auth, adminAuth, postController.getAllPostsAdmin);

//Admin: Updating Post
router.put('/admin/update_post/:postId', auth, adminAuth, postController.updatePostByIdAdmin);

//Admin: Delete Any Post
router.delete('/admin/delete_post/:postId', auth, adminAuth, postController.deletePostByIdAdmin);

module.exports = router;
