import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import evento from './evento.js'
import interes from './interes.js'

const interes_evento = sequelize.define('interes_evento', {
  codigo_interes_evento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  evento: {
    type: DataTypes.STRING,
    references: {
      model: evento,
      key: 'codigo_evento'
    }
  },
  interes: {
    type: DataTypes.INTEGER,
    references: {
      model: interes,
      key: 'codigo_interes'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// Relaciones
interes_evento.belongsTo(evento, {
  foreignKey: 'evento',
  as: 'fki_evento'
})

interes_evento.belongsTo(interes, {
  foreignKey: 'interes',
  as: 'fki_interes'
})

export default interes_evento
