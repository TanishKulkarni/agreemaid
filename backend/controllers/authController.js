const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User Exists '});

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username } });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials '});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials '});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username } });
};