const { insert } = require('../services/cart.service');

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

module.exports = { addItem };