const persona = require('../models/persona.js');

// PUT
const modificarPerfil = async (req, res) => {
    const atributosActualizados = req.body;

    console.log(atributosActualizados);
    console.log("el i del usuario es: " + req.id_usuario);
  
    try {
      const personaExiste = await persona.findByPk(req.id_usuario);
  
      if (!personaExiste) {
        return res.status(404).json({ message: 'la persona a editar no existe' });
      }
      const personaActualizada = Object.assign(personaExiste, atributosActualizados);
  
      await personaActualizada.save();
  
      return res.status(200).json({ message: 'datos de perfil actualizados exitosamente' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
  };


module.exports = modificarPerfil;