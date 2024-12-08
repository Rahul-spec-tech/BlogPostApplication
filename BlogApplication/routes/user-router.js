const express = require('express');
const app = express();
const userController = require('../models/controllers/user-controller.js');

// Creating a new user
app.post('/add_user', userController.createUser);

//loging the user
app.post('/login', userController.loginUser);

// Getting User Details
app.get('/get_user', userController.getAllUsers);

// Getting User By Id
app.get('/get_user/:id', userController.getUserById);

// Updating User By Id
app.put('/update_user/:id', userController.updateUserById);

// Deleting User By Id
app.delete('/delete_user/:id', userController.deleteUserById);

module.exports = app;
