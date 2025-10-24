import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import ciudad from './ciudad.js';
import persona from './persona.js';

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
  creador: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: persona,
      key: persona.id,
    }
  },
  estado: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false
});

lugar.belongsTo(ciudad, {
  foreignKey: 'ciudad',
  as: 'fkl_c'
});

lugar.belongsTo(persona, {
  foreignKey: 'creador',
  as: 'fkl_creador'
});

export default lugar;