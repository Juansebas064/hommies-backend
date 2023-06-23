const { pool } = require("../api/db.js");
const { uuidLugar } = require("../api/utils.js");
const lugar = require("../models/lugar.js")


const getLugares = async (req, res) => {

  try {
    const query = 'select l.* from lugar l inner join persona p on l.ciudad = p.ciudad where p.id = $1';
    const values = [req.id_usuario];
    const lugares = await pool.query(query, values);

    if (!lugares) {
      res.status(404).json({ error: 'Lugares en la misma ciudad no encontrados' });
    }

    res.status(200).json(lugares);
  } catch (error) {
    console.error("Error al realizar la solicitud de lugares:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos de lugares" });
  }
};

const agregarLugar = async (req, res) => {
    
  try {
      const datosNuevoLugar = req.body;
      const foto = req.file.path; // Obtén la ruta de la imagen generada por Multer
      const codigo_lugar = uuidLugar();
      datosNuevoLugar.foto=foto;
      datosNuevoLugar.codigo_lugar=codigo_lugar;
      
      
      
      await lugar.create({
        codigo_lugar: datosNuevoLugar.codigo_lugar,
        nombre: datosNuevoLugar.nombre,
        direccion: datosNuevoLugar.direccion,
        aforo: datosNuevoLugar.aforo,
        foto: datosNuevoLugar.foto,
        descripcion: datosNuevoLugar.descripcion,
        ubicacion: datosNuevoLugar.ubicacion,
        ciudad: datosNuevoLugar.ciudad
      })
      
      res.status(200).json({ message: 'Lugar insertado correctamente' });
    } catch (error) {
      console.error('Error al insertar lugar:', error);
      res.status(500).json({ error: 'Ocurrió un error al insertar el lugar' });
    }
  };


module.exports = {
  getLugares: getLugares,
  agregarLugar: agregarLugar
};
