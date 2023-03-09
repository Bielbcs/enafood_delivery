const Cart = require('../models/cart.model');
const Product = require('../models/products.model');
const HttpException = require('../utils/HttpException');

const get = async (id) => {
  const cart = await Cart.findOne({ user_id: id });

  return cart;
}

const insert = async (prodId, userId) => {
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

const addQuantity = async (prodId, userId, quantity) => {
  await Cart.updateOne(
    { user_id: userId, 'products._id': prodId },
    { $set: { 'products.$.quantity': quantity } }
  );

  const updatedCart = await Cart.findOne({ user_id: userId });

  return updatedCart;
}

const remove = async (prodId, userId) => {
  const result = await Cart.findOneAndUpdate(
    { user_id: userId },
    { $pull: { products: { _id: prodId } } },
    { new: true }
  )
  
  return result;
}

module.exports = { get, insert, addQuantity, remove };
