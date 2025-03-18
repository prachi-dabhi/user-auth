const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email Verification Setup
const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Click the link to verify your account: <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify</a></p>`
    };

    await transporter.sendMail(mailOptions);
};

// Register User
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!['customer', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, role, verificationToken });
        await newUser.save();

        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({ message: 'Registration successful. Please verify your email.' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.json({ message: 'Email verified. You can now log in.' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};