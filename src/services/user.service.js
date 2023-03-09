const User = require('../models/user.model');
const md5 = require('md5');
const HttpException = require('../utils/HttpException');

const insert = async (data) => {
  const { email } = data;
  const pass = md5(data.password);

  const user = await User.findOne({ email });
  if (user) throw new HttpException(404, 'Usuário já existe');

  await User.create({ ...data, password: pass });

  const createdUser = User.findOne({ email });

  return createdUser;
}

const getUser = async (data) => {
  const { email } = data;
  const pass = md5(data.password);

  const user = await User.findOne({ email }).select('+password -__v');
  if (!user || user.password !== pass) throw new HttpException(404, 'Credenciais inválidas');

  return user;
}

module.exports = { insert, getUser };