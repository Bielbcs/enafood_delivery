const { insert, getUser } = require('../services/user.service');
const { createToken } = require('../utils/token');

const signUp = async (req, res, next) => {
  try {
    const createdUser = await insert(req.body);
  
    return res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await getUser(req.body);
    
    const token = createToken(user);

    return res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}

module.exports = { signUp, login }