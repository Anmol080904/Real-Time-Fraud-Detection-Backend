module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecurekey',
  jwtExpire: '1d', // can be adjusted
};
