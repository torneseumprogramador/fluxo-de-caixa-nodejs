// database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('fluxo_de_caixa_nodejs', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Ou substitua por outro dialeto do banco de dados suportado pelo Sequelize
});

module.exports = sequelize;
