const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');

const evento = sequelize.define('evento', {
    codigo_evento: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_final: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lugar: {
      type: DataTypes.STRING,
      references: {
        model: 'lugar',
        key: 'codigo_lugar',
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona',
        key: 'id',
      }
    },
  },{
    timestamps: false 
  });

  module.exports = evento;