const { Router } = require('express');
const { signUp, login } = require('../controllers/user.controller');

const route = Router();

route.post('/', signUp);

route.post('/login', login)

module.exports = route;