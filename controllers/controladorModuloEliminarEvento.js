
const evento = require('../models/evento.js');


const eliminarEvento = async (req, res) => {
    
    
    const atributosActualizados = req.body;

   // console.log(atributosActualizados);
  
    try {
      const eventoExistente = await evento.findByPk(req.body.codigo_evento);
  
      if (!eventoExistente) {

        return res.status(404).json({ message: 'El evento a eliminar no existeeeeee' });
      }
  
      await eventoExistente.destroy();
  
      return res.status(200).json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al eliminar el evento' });
    }
  };


module.exports = eliminarEvento;
