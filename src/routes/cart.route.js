const { Router } = require('express');
const { verifyToken } = require('../utils/token');
const { addItem, updateQuanitty } = require('../controllers/cart.controller');

const route = Router();

route.post('/:id', verifyToken, addItem);
route.put('/:id/:quantity', verifyToken, updateQuanitty);

module.exports = route;