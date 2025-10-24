import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize'
import persona from './persona.js'
import interes from './interes.js'

const interes_persona = sequelize.define('interes_persona', {
  codigo_interes_persona: {
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
interes_persona.belongsTo(persona, {
  foreignKey: 'persona',
  as: 'fki_persona'
})

interes_persona.belongsTo(interes, {
  foreignKey: 'interes',
  as: 'fki_interes'
})

export default interes_persona
