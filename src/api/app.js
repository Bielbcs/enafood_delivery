const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/images', express.static('public'));

app.get('/', (_req, res) => res.json('Tudo funcionando!'));

module.exports = app;
