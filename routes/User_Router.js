const express = require('express');
const app = express();
const User = require('../models/User');

//Creating a new user
app.post('/add_user', async(req, res) => {
  const { userName, email, phoneNum, location }=req.body;
  try{
      const user=new User({userName, email, phoneNum, location});
      await user.save();
      res.status(201).send(user);
  }catch (error) {
      res.status(400).send(error);
  }    
});

//Geting User Details
app.get('/get_user', async(req, res)=>{
    try{
        const users=await User.find();
        res.status(200).send(users);
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

// Getting User By Id
app.get('/get_user/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('The User was not found');
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
});

//Updating User By Id
app.put('/update_user/:id', async (req, res) => {
    const { id } = req.params;
    const { user_name, email, phoneNum, location } = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, { user_name, email, phoneNum, location }, 
      { new: true, runValidators: true });
      if (!user) {
        return res.status(404).send('Post is not found');
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Deleting Post By Id
app.delete('/delete_user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User is not found');
    }
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = app;
