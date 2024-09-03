const Post = require ('../Post.js');
const User = require ('../User.js');
const jwt =  require ('jsonwebtoken');
const { getUserDataFromToken } = require('../../middleware/auth-middleware');

// Creating a Post
const createPost = async (req, res) => {
  const { title, description } = req.body;
  const user = getUserDataFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const post = new Post({ title, description, author: user.userName });
    await post.save();
    res.status(201).json({ post, username: user.userName });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the post.' });
  }
};

// Getting All Posts
const getAllPosts = async (req, res) => {
  const user = getUserDataFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(400).json({ error: 'An error occurred while retrieving the posts.' });
  }
};

// Getting Post By Id
const getPostById = async (req, res) => {
  const { id } = req.params;
  const user = getUserDataFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const post = await Post.findOne({ _id: id, author: user.userName });
    if (!post) {
      return res.status(404).json({ error: 'The Post was not found or not created by this user.' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred.' });
  }
};

// Updating Post By Id
const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const user = getUserDataFromToken(req);
  console.log('Updating post with ID:', id);
  console.log('User from token:', user);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const postBeforeUpdate = await Post.findOne({ _id: id });
    //console.log('Post before update:', postBeforeUpdate);
    if (!postBeforeUpdate) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    const post = await Post.findOneAndUpdate(
      { _id: id, author: postBeforeUpdate.author}, 
      { title, description, updated_At: Date.now() },
      { new: true, runValidators: true }
    );
    console.log(post);
    if (!post) {
      return res.status(404).json({ error: 'Post not found or not created by this user.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ error: 'An error occurred.' });
  }
};

// Delete Post By Id
const deletePostById = async (req, res) => {
  const { id } = req.params;
  const user = getUserDataFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const post = await Post.findOneAndDelete({ _id: id, author: user.userName }); 
    if (!post) {
      return res.status(404).json({ error: 'Post not found or not created by this user.' });
    }
    res.status(200).json({ message: 'Post deleted successfully', post });
  } catch (error) {
    console.error('Error deleting post:', error); 
    res.status(400).json({ error: 'An error occurred during deletion.' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
};