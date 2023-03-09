const mongoose = require('mongoose');
require('dotenv/config');

const DB_HOST = process.env.DB_HOST || localhost;
const DB_PORT = process.env.DB_PORT || 27017;

const db = async () => await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/enafood`);

module.exports = db;