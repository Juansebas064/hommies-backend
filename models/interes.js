import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

const interes = sequelize.define('interes', {
  codigo_interes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false, // tu modelo de ejemplo no usa timestamps
  freezeTableName: true // para que no pluralice el nombre de la tabla
});

export default interes;
