const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');

const lugar = sequelize.define('lugar', {
    codigo_lugar: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aforo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lugar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false 
  });

  module.exports = lugar;