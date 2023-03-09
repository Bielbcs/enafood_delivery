const { getAll } = require('../services/product.service');

const getProducts = async (req, res, next) => {
  try {
    const products = await getAll();
  
    res.json(products);
  } catch (error) {
    next(error);
  }
}

module.exports = { getProducts };
