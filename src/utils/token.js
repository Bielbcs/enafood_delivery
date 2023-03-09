const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtKey = process.env.SECRET_KEY;

function createToken(userBody) {
  const { password, ...rest } = userBody;
  const token = jwt.sign(
    rest,
    jwtKey,
    { algorithm: 'HS256', expiresIn: '1d' },
  );

  return token;
}

function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    jwt.verify(authorization, jwtKey);
    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { createToken, verifyToken };