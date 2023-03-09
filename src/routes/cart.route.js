const { Router } = require('express');
const { verifyToken } = require('../utils/token');
const { getCart, addItem, updateQuanitty, removeItem } = require('../controllers/cart.controller');

const route = Router();

route.get('/', verifyToken, getCart);
route.post('/:id', verifyToken, addItem);
route.put('/:id/:quantity', verifyToken, updateQuanitty);
route.delete('/:id', verifyToken, removeItem);

module.exports = route;