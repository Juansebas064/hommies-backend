import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

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
}, {
  timestamps: false
});

export default ciudad;