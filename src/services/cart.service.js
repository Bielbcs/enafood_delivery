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
  
  const index = products.findIndex((item) => item._id.toString() === prodId);

  if (index !== -1) {
    products[index].quantity += 1;
  } else {
    products.push({ ...product._doc });
  }
  
  const savedCart = await cart.save();

  return savedCart;
}

const addQuantity = async (prodId, userId, quantity) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { user_id: userId, 'products._id': prodId },
    { $set: { 'products.$.quantity': quantity } },
    { new: true }
  );

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
