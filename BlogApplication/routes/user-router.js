const express = require('express');
const router = express.Router();
const userController = require('../models/controllers/user-controller.js');
const { auth } = require('../middleware/auth-middleware.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Creating a new user
router.post('/add_user', userController.createUser);

//loging the user
router.post('/login', userController.loginUser);

// Getting User Details
router.get('/get_user', userController.getAllUsers);

// Getting User By Id
router.get('/get_user/:id', userController.getUserById);

// Updating User By Id
router.put('/update_user/:id', auth, userController.updateUserById);

// Deleting User By Id
router.delete('/delete_user/:id', userController.deleteUserById);

// Handle profile photo upload
router.post('/upload_photo', auth, upload.single('profilePhoto'), userController.uploadProfilePhoto);

module.exports = router;
