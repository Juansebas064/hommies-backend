const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');

const ciudad = sequelize.define('ciudad', {
    codigo_ciudad: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: false 
  });

  module.exports = ciudad;