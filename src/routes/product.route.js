const { Router } = require('express');
const { verifyToken } = require('../utils/token');
const { getProducts } = require('../controllers/product.controller');

const route = Router();

route.get('/', verifyToken, getProducts);

module.exports = route;