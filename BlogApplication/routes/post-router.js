const express = require('express');
const app = express();
//const Post = require('../models/Post');
const postController = require('../models/controllers/post-controller');
const auth = require('../middleware/auth-middleware.js');

// Create a new Blog Post
app.post('/add_post', auth, postController.createPost);

// Getting Post By Id
app.get('/get_post/:id', auth, postController.getPostById);

// Getting All the Posts
app.get('/get_posts', auth, postController.getAllPosts);

// Updating Post By Id
app.put('/update_post/:id', auth, postController.updatePostById);

// Deleting Post By Id
app.delete('/delete_post/:id', auth, postController.deletePostById);

module.exports = app;
