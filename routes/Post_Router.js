const express = require('express');
const app = express();
const Post = require('../models/Post');

// Create a new Blog Post
app.post('/add_post', Post_Controller.createPost);

// Getting Post By Id
app.get('/get_post/:id', Post_Controller.getPostById);

// Getting All the Posts
app.get('/get_posts', Post_Controller.getAllPosts);

// Updating Post By Id
app.put('/update_post/:id', Post_Controller.updatePostById);

// Deleting Post By Id
app.delete('/delete_post/:id', Post_Controller.deletePostById);

module.exports = app;
