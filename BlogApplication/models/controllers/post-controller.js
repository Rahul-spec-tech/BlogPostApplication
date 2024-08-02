const Post = require ('../Post');

//Creating a Post
const createPost = async (req, res) => {
    const { title, description, author } = req.body;
    try {
      const post = new Post({ title, description, author });
      await post.save();
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  };

//Getting All Post
const getAllPosts =  async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  };

//Getting Post By Id
const getPostById = async (req, res) => {
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
  };

  //Updating Post By Id
  const updatePostById = async (req, res) => {
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
  };

  //Delete Post By Id
  const deletePostById =  async (req, res) => {
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
  };

  module.exports ={
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
  };