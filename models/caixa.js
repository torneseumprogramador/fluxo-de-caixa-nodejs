// caixa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Caixa = sequelize.define('Caixa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Define se o modelo terá timestamps padrões (created_at e updated_at)
  tableName: 'caixas', // Nome da tabela no banco de dados
});

module.exports = Caixa;
