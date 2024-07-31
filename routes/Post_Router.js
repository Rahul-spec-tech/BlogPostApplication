const express = require('express');
const app = express();
const Post = require('../models/Post');

// Create a new Blog Post
app.post('/add_blog', async (req, res) => {
  const { title, description, author } = req.body;
  try {
    const post = new Post({ title, description, author });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Getting Post By Id
app.get('/get_post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send('The Post was not found');
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Getting All the Posts
app.get('/get_posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Updating Post By Id
app.put('/update_post/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, author } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, description, author, updated_At: Date.now() }, 
    { new: true, runValidators: true });
    if (!post) {
      return res.status(404).send('Post is not found');
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting Post By Id
app.delete('/delete_post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send('Post is not found');
    }
    res.status(200).send('Post deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = app;
