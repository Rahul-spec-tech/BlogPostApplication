const jwt = require('jsonwebtoken');
const getUserDataFromToken = (req) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
const auth = (req, res, next) => {
  const user = getUserDataFromToken(req);
  console.log('Decoded User:', user);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = user;
  next();
};
module.exports = { auth, getUserDataFromToken };
