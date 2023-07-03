const persona = require('../models/persona.js');
const fs = require('fs');
const path = require('path');

const modificarPerfil = async (req, res) => {
  const atributosActualizados = req.body;

  try {
    const personaExiste = await persona.findByPk(req.id_usuario);

    if (!personaExiste) {
      return res.status(404).json({ message: 'La persona a editar no existe' });
    }

    // Verifica si se ha proporcionado una nueva imagen de perfil
    if (req.file) {
      // Realiza las comprobaciones necesarias y elimina la imagen existente si corresponde
      if (personaExiste.foto && personaExiste.foto.startsWith('https://lh3.googleusercontent.com/')) {
        const imagePath = path.join(__dirname, '../api/img/avatars/', path.basename(personaExiste.foto));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Actualiza la columna "foto" con la nueva ruta de la imagen cargada
      atributosActualizados.foto = `api/img/avatars/${req.file.filename}`;
    }

    // Actualiza los demás atributos del perfil
    Object.assign(personaExiste, atributosActualizados);

    await personaExiste.save();

    return res.status(200).json({ message: 'Datos de perfil actualizados exitosamente' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};


module.exports = modificarPerfil;