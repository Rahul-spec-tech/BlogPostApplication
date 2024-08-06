const User = require('../User');

//Creating a user
const createUser = async (req, res) => {
    const { userName, email, phoneNum, location } = req.body;
    try {
      const user = new User({ userName, email, phoneNum, location });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).send(error);
    }
  };

  //Getting all User Details
  const getAllUsers =  async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(400).send(error);
    }
  };

  //Getting User By Id
  const getUserById =  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
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
        return res.status(404).send('User not found');
      }
      res.status(200).send(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).send(error);
    }
  };

  //Deleting User By Id
  const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(400).send(error);
    }
  }; 

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
  };