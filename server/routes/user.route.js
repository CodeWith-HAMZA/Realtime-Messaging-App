const jwt = require("jsonwebtoken");

const express = require("express");
const User = require("../models/user.model");
const { authenticateToken } = require("../middleware");
const { generateToken } = require("../utils");
const router = express.Router();

// Import User model

// Register a new user
router.post("/register", async (req, res) => {
  try {
    // Get user details from request body
    const { name, email, password, profile } = req.body;
    console.log(profile, name);

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account with this email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      ...(profile ? { profile } : {}),
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = await generateToken({ userId: savedUser._id });

    return res.status(201).json({
      user: savedUser,
      token,
      message: "Successfully Account Created",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    // Get user credentials from request body
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Account with this email does not exist" });
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = await generateToken({ userId: user._id });

    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user profile
router.patch("/profile", async (req, res) => {
  try {
    // Get user ID from request
    const userId = req.user.id;

    // Get updated user details from request body
    const { name, email } = req.body;

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user account
router.delete("/account", async (req, res) => {
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

// Assuming you have already imported necessary modules and models

// Controller function to find all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Assuming User is the Mongoose model for users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// searchQuery?keyworad
router.get("/search", authenticateToken, async (req, res) => {
  const currentUser = req.user._id;
  try {
    const keyword = req.query.searchQuery
      ? {
          $or: [
            { name: { $regex: req.query.searchQuery, $options: "i" } },
            { email: { $regex: req.query.searchQuery, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find({ ...keyword, _id: { $ne: currentUser } });
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check-auth", authenticateToken, async (req, res) => {
  // If the execution reaches this point, it means the user is authorized
  const user = await User.findById(req.user._id);
  // console.log(user)
  if (!user) {
    return res.status(400).json({ message: "Token Is Tempored" });
  }
  return res.status(200).json({ message: "User is authorized", user });
});

// Route to get user profile data
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Get user ID from request (assuming you have authentication middleware)
    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
