const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public (for now, usually Admin only)
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'student',
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Forgot password - Send OTP
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry (10 minutes)
    user.otpCode = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // In a real app, send email here. For now, log to console and return in response for testing
    console.log(`OTP for ${email}: ${otp}`);

    res.json({
        message: 'OTP sent to your email (simulated)',
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
};

// @desc    Reset password using OTP
// @route   POST /api/users/resetpassword
// @access  Public
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
        email,
        otpCode: otp,
        otpExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Set new password
    user.password = newPassword;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
};

module.exports = {
    registerUser,
    authUser,
    getMe,
    forgotPassword,
    resetPassword,
};
