const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');
const ciudad = require('./ciudad.js');

const persona = sequelize.define('persona', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tipo_de_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    ciudad: {
        type: DataTypes.STRING,
        references: {
          model: ciudad,
          key: ciudad.codigo_ciudad,
        }
      },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_session: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: false 
  });

  persona.belongsTo(ciudad, {
    foreignKey: 'ciudad',
    as: 'fkp_c'
  });

  module.exports = persona;