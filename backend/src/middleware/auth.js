const jwt = require('jsonwebtoken');
const { User } = require('../models/');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Authentication required' });

    const token = auth.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(data.userId);
        if (!user) return res.status(401).json({ error: 'Invalid token' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
