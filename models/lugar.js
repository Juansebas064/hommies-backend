const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');
const ciudad = require('./ciudad.js');

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
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
        references: {
          model: ciudad,
          key: ciudad.codigo_ciudad,
        }
    },
  },{
    timestamps: false 
  });

  lugar.belongsTo(ciudad, {
    foreignKey: 'ciudad',
    as: 'fkl_c'
  });

  module.exports = lugar;