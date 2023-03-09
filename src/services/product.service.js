const Product = require('../models/products.model');

const getAll = async () => {
  const products = Product.find().select('-__v');

  return products;
}

module.exports = { getAll };
