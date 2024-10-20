const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Validate request
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            mobile: Joi.string().min(10).required(),
            password: Joi.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        // Save user
        user = new User({ name, email, mobile, password });
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
