const User = require('../User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Creating a user
const createUser = async (req, res) => {
    const { userName, email, phoneNum, location, password } = req.body;
    try {
      const user = new User({ userName, email, phoneNum, location, password });
      await user.save();
      res.status(201).send(user);
    } 
    catch (error) {
      if(error.code === 11000){
        return res.status(400).json({error: "User with this email already exists."});
      }
      res.status(400).send(error);
    }
  };

  //Logining in
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
      const user = await User.findOne({ email });
      if (!user){
        return res.status(400).json({error: 'Invalid email or Password'});
      }
      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching){
        return res.status(400).json({error: 'Invalid email or Password'});
      }
      const token = jwt.sign({_id: user._id, userName: user.userName }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
      res.json({ user, token });
    }
    catch (error){
      res.status(400).send(error);
    }
  };

  //Getting all User Details
  const getAllUsers =  async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //Getting User By Id
  const getUserById =  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }
      res.status(200).send(user);
    } catch (error) {
       res.status(400).send(error);
    }
  };

  // Updating User By Id
  const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { userName, email, phoneNum, location } = req.body; // Consistent field names
    try {
      const user = await User.findByIdAndUpdate(id, { userName, email, phoneNum, location }, 
        { new: true, runValidators: true });
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  //Deleting User By Id
  const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }
      res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
      res.status(400).send(error);
    }
  }; 

  module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
  };