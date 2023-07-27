// database.js
const Sequelize = require('sequelize');



const sequelize = new Sequelize(
  (process.env.DATABASE || 'fluxo_de_caixa_nodejs'),
  (process.env.DATABASE_USER || 'root'),
  (process.env.DATABASE_PASS || 'root'),
  {
    host: (process.env.DATABASE_HOST || 'localhost'),
    dialect: 'mysql', // Ou substitua por outro dialeto do banco de dados suportado pelo Sequelize
  }
);

module.exports = sequelize;
