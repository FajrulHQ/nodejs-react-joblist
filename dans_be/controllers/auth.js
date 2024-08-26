const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await User.createUser(username, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    register,
    login
};
