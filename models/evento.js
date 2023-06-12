const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');
const lugar = require('./lugar.js');
const persona = require('./persona.js');

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
        model: lugar,
        key: lugar.codigo_lugar,
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
        model: persona,
        key: persona.id,
      }
    },
  },{
    timestamps: false 
  });

  evento.belongsTo(lugar, {
    foreignKey: 'lugar',
    as: 'fke_l'
  });

  evento.belongsTo(persona, {
    foreignKey: 'creador',
    as: 'fke_p'
  });

  module.exports = evento;