const mongoose = require('mongoose');
const INITIAL_PRODUCTS = require('../../seeder');
const Product = require('../models/products.model');
require('dotenv/config');

const DB_HOST = process.env.DB_HOST || localhost;
const DB_PORT = process.env.DB_PORT || 27017;

const db = async () => await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/enafood`);

// Uma vez que o banco foi conectado, popula a tabela Products

mongoose.connection.once('open', async () => {
  console.log('Banco conectado');

  try {
    // Verifica se os produtos já estão inseridos
    const products = await Product.find();
    if (products.length) return console.log('Produtos já estão inseridos');

    // Insere os produtos no banco de dados
    await Product.insertMany(INITIAL_PRODUCTS);

    console.log('Produtos inseridos');
  } catch (err) {
    console.error(err);
  }
});

module.exports = db;