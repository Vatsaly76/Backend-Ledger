const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.UserRegisterController = async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({
            message: 'Email already exists',
            status: 'failed'
        });
    }

    try {
        const user = await userModel.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('token', token);
        res.status(201).json({ message: 'User registered successfully', status: 'success', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error, status: 'failed' });
    }
};