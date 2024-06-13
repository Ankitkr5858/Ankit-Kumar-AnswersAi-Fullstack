const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//  METHOD POST
//  ROUTE  /api/users
exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email", email)
        console.log("password", password)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//  METHOD GET
//  ROUTE  /api/users/:userId
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//  METHOD GET
//  ROUTE  /api/users/:userId/questions
exports.getUserQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ userId: req.params.userId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};