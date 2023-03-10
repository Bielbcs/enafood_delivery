const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const md5 = require('md5');
const HttpException = require('../utils/HttpException');

const insert = async (data) => {
  const pass = md5(data.password);

  const user = await User.findOne({ email: data.email });
  if (user) throw new HttpException(404, 'Usuário já existe');

  const { _id, username, email } = await User.create({ ...data, password: pass });

  await Cart.create({ user_id: _id, products: [] });

  return { _id, username, email };
}

const getUser = async (data) => {
  const { email } = data;
  const pass = md5(data.password);

  const user = await User.findOne({ email }).select('password');
  if (!user || user.password !== pass) throw new HttpException(404, 'Credenciais inválidas');

  const checkedUser = await User.findOne({ email }).select('-__v');

  return checkedUser;
}

module.exports = { insert, getUser };