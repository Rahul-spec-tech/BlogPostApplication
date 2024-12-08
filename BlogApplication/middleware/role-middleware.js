const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const user =req.user;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
};

module.exports = adminAuth;
