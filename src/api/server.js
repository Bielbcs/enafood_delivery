const db = require('../models/connection');
const app = require('./app');

db().then(() => app.listen(3001, () => console.log('Servidor rodando na porta 3001')));
