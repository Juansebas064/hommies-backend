import ciudad from '../models/ciudad.js'
import interes from '../models/interes.js'

export async function seedDatabase() {
  try {
    // Ciudades
    const ciudades = [
      { codigo_ciudad: 111, nombre: 'Tuluá', departamento: 'Valle del Cauca' },
      { codigo_ciudad: 222, nombre: 'Cali', departamento: 'Valle del Cauca' },
    ]

    // Intereses
    const intereses = [
      { codigo_interes: 1, nombre: 'Aviación' },
      { codigo_interes: 2, nombre: 'Música' },
      { codigo_interes: 3, nombre: 'Ciclismo' },
      { codigo_interes: 4, nombre: 'Política' },
      { codigo_interes: 5, nombre: 'Programación' },
    ]

    // Inserta solo si las tablas están vacías
    const countCiudades = await ciudad.count()
    if (countCiudades === 0) {
      await ciudad.bulkCreate(ciudades)
      console.log('✅ Ciudades insertadas')
    }

    const countIntereses = await interes.count()
    if (countIntereses === 0) {
      await interes.bulkCreate(intereses)
      console.log('✅ Intereses insertados')
    }

  } catch (error) {
    console.error('❌ Error al insertar datos iniciales:', error)
  }
}
