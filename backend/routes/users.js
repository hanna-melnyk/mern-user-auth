//backend/routes/users.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (password.length < 6) return res.status(400).send('Password must be at least 6 characters long.');
    if (/\d/.test(username)) return res.status(400).send('Username must not contain numbers.');

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).send('Email already registered.');

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered.');
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' }); // set cookie here
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).send('Error logging in.');
    }
});


// Profile
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user.');
    }
});

module.exports = router;
