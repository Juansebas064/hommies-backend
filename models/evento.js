import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import lugar from './lugar.js';
import persona from './persona.js';

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
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: persona,
      key: persona.id,
    }
  },
}, {
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

export default evento;