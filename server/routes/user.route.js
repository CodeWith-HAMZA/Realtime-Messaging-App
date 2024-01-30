const jwt = require('jsonwebtoken');

const express = require('express');
const User = require('../models/user.model');
const { authenticateToken } = require('../middleware');
const router = express.Router();

// Import User model


// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Get user details from request body
        const { name, email, password } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Account with this email already exists' });
        }

        // Create a new user instance
        const newUser = new User({ name, email, password });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken({ userId: savedUser._id });


        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        // Get user credentials from request body
        const { email, password } = req.body;

        // Check if user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Account with this email does not exist' });
        }


        // Check if the provided password matches the user's password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        // Generate JWT token 
        const token = generateToken({ userId: user._id });


        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user profile
router.patch('/profile', async (req, res) => {
    try {
        // Get user ID from request
        const userId = req.user.id;

        // Get updated user details from request body
        const { name, email } = req.body;

        // Find the user by ID and update their profile
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
    try {
        // Get user ID from request
        const userId = req.user.id;

        // Find the user by ID and delete their account
        await User.findByIdAndDelete(userId);

        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;