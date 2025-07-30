const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'ACCESS DENIED. No token provided.' });

  try {
    const verified = jwt.verify(token.split(' ')[1], jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'INVALID TOKEN' });
  }
};

module.exports = authMiddleware;
