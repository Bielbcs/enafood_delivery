const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.route');
const httpErrorMiddleware = require('../middlewares/httpErrorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/images', express.static('public'));

app.use('/user', userRoutes);

app.use(httpErrorMiddleware);

module.exports = app;
