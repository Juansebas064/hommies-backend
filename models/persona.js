import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import ciudad from './ciudad.js';

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
  token_recuperacion: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false
});

persona.belongsTo(ciudad, {
  foreignKey: 'ciudad',
  as: 'fkp_c'
});

export default persona;