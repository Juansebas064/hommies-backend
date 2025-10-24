import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import persona from './persona.js'
import evento from './evento.js'

const evento_participa = sequelize.define('evento_participa', {
  codigo_evento_participa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  persona: {
    type: DataTypes.STRING,
    references: {
      model: persona,
      key: 'id'
    }
  },
  evento: {
    type: DataTypes.STRING,
    references: {
      model: evento,
      key: 'codigo_evento'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// Relaciones
evento_participa.belongsTo(persona, {
  foreignKey: 'persona',
  as: 'fkp_persona'
})

evento_participa.belongsTo(evento, {
  foreignKey: 'evento',
  as: 'fkp_evento'
})

export default evento_participa
