const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validateUser = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = validateUser;