const User = require('../User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creating a user
const createUser = async (req, res) => {
    const { userName, email, phoneNum, location, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ userName, email, phoneNum, location, password: hashedPassword });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "User with this email already exists." });
        }
        res.status(500).send(error);
    }
};

// Log in
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ _id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ userName: user.userName, userId: user._id, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send(error);
    }
};

// Getting all user details
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Getting user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { userName, phoneNum, location, password } = req.body;
    try {
        if (!userName || !phoneNum || !location) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const updateData = { userName, phoneNum, location };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ userName: user.userName, userId: user._id, token: req.headers['authorization']?.split(' ')[1] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Update failed. Please try again.' });
    }
};

// Deleting user by ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Handle profile photo upload
const uploadProfilePhoto = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        const user = await User.findByIdAndUpdate(req.user._id, { profilePhoto: fileUrl }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ profilePhoto: fileUrl });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).send(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    uploadProfilePhoto
};
