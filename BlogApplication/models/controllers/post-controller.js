const Post = require ('../Post');
const User = require ('../User');
const jwt =  require ('jsonwebtoken');

const getUserDataFromToken = (req) => {
  const token = req.header('Authorization').replace('Bearer','');
  try{
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (error){
    return null;
  }
};


//Creating a Post
const createPost = async (req, res) => {
    const { title, description} = req.body;
    const user = getUserDataFromToken(req);
    if(!user){
      return res.status(401).send('unauthorized');
    }
    try {
      const post = new Post({ title, description, author:user._id });
      await post.save();
      res.status(201).send({post, username: user.userName});
    } catch (error) {
      console.log('Error creating post:', error);
      res.status(400).send('An error occured while creating the post.');
    }
};

//Getting All Post
const getAllPosts =  async (req, res) => {
  const user = getUserDataFromToken(req);
  if(!user){
    return res.status(401).send('Unauthorized');
  }
    try {
      const posts = await Post.find({ author: user._id});
      res.status(200).send(posts);
    } catch (error) {
      console.error('Error while getting the posts.', error);
      res.status(400).send('An error occured while retrieving the posts.');
    }
};

//Getting Post By Id
const getPostById = async (req, res) => {
    const { id } = req.params;
    const user = getUserDataFromToken(req);
    if(!user){
      return res.status(401).send('Unauthorized');
    }
    try {
      const post = await Post.findOne({ _id: id, author:user._id});
      if (!post) {
        return res.status(404).send('The Post was not found or not created by this user.');
      }
      res.status(200).send(post);
    } catch (error) {
      console.log('Error retrieving post by ID:',error);
      res.status(400).send('An error occured.');
    }
  };

  //Updating Post By Id
  const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, description} = req.body;
    const user = getUserDataFromToken(req);
    if(!user){
      return res.status(401).send('Unauthorized');
    }
    try {
      const post = await Post.findOneAndUpdate(
      {_id:id , author: user._id},
      { title, description, updated_At: Date.now() }, 
      { new: true, runValidators: true });
      if (!post) {
        return res.status(404).send('Post is not found or not created by this user.');
      }
      res.status(200).send(post);
    } catch (error) {
      console.log('Error updating Post by ID:', error);
      res.status(400).send('An error occured.');
    }
  };

  //Delete Post By Id
  const deletePostById =  async (req, res) => {
    const { id } = req.params;
    const user = getUserDataFromToken(req);
    if(!user){
      return res.status(401).send('Unauthorized');
    }
    try {
      const post = await Post.findOneAndDelete({_id: id, author: user._id});
      if (!post) {
        return res.status(404).send('Post not found nor created by this user.');
      }
      res.status(200).send('Post deleted successfully');
    } catch (error) {
      console.log('Error deleting post by ID:', error);
      res.status(400).send('An Error occured.');
    }
  };

  module.exports ={
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
  };