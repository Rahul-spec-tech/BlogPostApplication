const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller.js');
const { auth } = require('../middleware/auth-middleware.js');
const adminAuth  = require('../middleware/role-middleware.js');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_pic',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage});

// Creating a new user
router.post('/add_user', userController.createUser);

//loging the user
router.post('/login', userController.loginUser);

// Getting User Details
router.get('/get_user', auth, userController.getAllUsers);

// Getting User By Id
router.get('/get_user/:id', userController.getUserById);

// Updating User By Id
router.put('/update_user/:id', auth, userController.updateUserById);

// Deleting User By Id
router.delete('/delete_user/:id', userController.deleteUserById);

// Handle profile photo upload
router.post('/upload_photo', auth, upload.single('profilePhoto'), userController.uploadProfilePhoto);

// Admin: Get all users
router.get('/admin/get_all_users', auth, adminAuth, userController.getAllUsers);

// Admin: Delete the user
router.delete('/admin/delete_user/:id', auth, adminAuth, userController.deleteUserById);

module.exports = router;
