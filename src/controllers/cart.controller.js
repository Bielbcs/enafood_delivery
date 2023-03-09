const { get, insert, addQuantity, remove } = require('../services/cart.service');

const getCart = async (req, res) => {
  const { _id } = req.headers.decoded;

  try {
    const cart = await get(_id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const addItem = async (req, res, next) => {
  const { _id: userId } = req.headers.decoded;
  const { id: prodId } = req.params;

  try {
    const updatedCart = await insert(prodId, userId);
    res.status(201).json(updatedCart);
  } catch (error) {
    next(error);
  }
}

const updateQuanitty = async (req, res, next) => {
  const { _id: userId } = req.headers.decoded;
  const { id: prodId, quantity } = req.params;

  try {
    const updatedCart = await addQuantity(prodId, userId, quantity);
    res.status(201).json(updatedCart);
  } catch (error) {
    next(error);
  }
}

const removeItem = async (req, res, next) => {
  const { _id: userId } = req.headers.decoded;
  const { id: prodId } = req.params;

  try {
    const deleted = await remove(prodId, userId);

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCart, addItem, updateQuanitty, removeItem };