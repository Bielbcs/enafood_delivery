const { Router } = require('express');
const { signUp, login } = require('../controllers/user.controller');
const validateUser = require('../validations/user.validation');

const route = Router();

route.post('/', validateUser, signUp);

route.post('/login', validateUser, login)

module.exports = route;