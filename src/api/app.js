const express = require('express');
const userRoutes = require('../routes/user.route');
const productRoutes = require('../routes/product.route');
const cartRoutes = require('../routes/cart.route');
const httpErrorMiddleware = require('../middlewares/httpErrorMiddleware');

const app = express();

app.use(express.json());

app.use('/images', express.static('public'));

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

app.use(httpErrorMiddleware);

module.exports = app;
