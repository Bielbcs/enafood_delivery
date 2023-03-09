const Cart = require('../models/cart.model');
const Product = require('../models/products.model');
const HttpException = require('../utils/HttpException');

const insert = async (prodId, userId, quantity) => {
  const cart = await Cart.findOne({user_id: userId});
  const product = await Product.findOne({ _id: prodId }).select('-__v');
  const { products } = cart;
  
  if (products.some((item) => item._id.toString() === prodId)) {
    throw new HttpException(404, 'Produto já está no carrinho!');
  } else {
    products.push({ ...product._doc });
  }
  
  await cart.save();

  const newCart = await Cart.findOne({user_id: userId});

  return newCart;
}

module.exports = { insert };
