const express = require('express');
const app = express.Router();
const User = require('../models/User');

// Creating a new user
app.post('/add_user', user-controller.createUser);

// Getting User Details
app.get('/get_user', user-controller.getUsers);

// Getting User By Id
app.get('/get_user/:id', user-controller.getUserById);

// Updating User By Id
app.put('/update_user/:id', user-controller.updateUserById);

// Deleting User By Id
app.delete('/delete_user/:id', user-controller.deleteUserById);

module.exports = app;
