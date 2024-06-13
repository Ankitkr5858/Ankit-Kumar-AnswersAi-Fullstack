const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//  METHOD POST
//  ROUTE  /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: `Bearer ${token}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = (req, res) => {
    // Logout logic
    res.status(200).json({ message: 'Logged out successfully' });
};

exports.refreshToken = (req, res) => {
    // Token refresh logic
    res.status(200).json({ message: 'Token refreshed' });
};