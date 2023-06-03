const {sequelize} = require('../api/db.js');
const {DataTypes} = require('sequelize');

const persona = sequelize.define('persona', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tipo_usuario: {
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
        type: DataTypes.INTEGER,
        references: {
          model: 'ciudad',
          key: 'codigo_ciudad',
        },
      },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_session: {
      type: DataTypes.STRING,
    },
  }, {
    tableName:'persona'
  });

  module.exports = persona;