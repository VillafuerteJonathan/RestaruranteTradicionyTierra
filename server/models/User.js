const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // archivo que exporta tu conexión

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // otros campos que necesites
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
