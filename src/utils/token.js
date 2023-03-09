const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtKey = process.env.SECRET_KEY;

const createToken = (userBody) => {
  const { password, ...rest } = userBody;
  const token = jwt.sign(
    rest,
    jwtKey,
    { algorithm: 'HS256', expiresIn: '1d' },
  );

  return token;
}

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const decoded = jwt.verify(authorization, jwtKey);
    req.headers.decoded = decoded._doc;
    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { createToken, verifyToken };