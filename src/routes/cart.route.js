const { Router } = require('express');
const { verifyToken } = require('../utils/token');
const { addItem } = require('../controllers/cart.controller');

const route = Router();

route.post('/:id', verifyToken, addItem)

module.exports = route;