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
    const foto = req.file ? req.file.path : undefined;
    const codigo_lugar = uuidLugar();
    datosNuevoLugar.foto = foto;
    datosNuevoLugar.codigo_lugar = codigo_lugar;



    await lugar.create({
      codigo_lugar: datosNuevoLugar.codigo_lugar,
      nombre: datosNuevoLugar.nombre,
      direccion: datosNuevoLugar.direccion,
      aforo: datosNuevoLugar.aforo,
      foto: datosNuevoLugar.foto,
      descripcion: datosNuevoLugar.descripcion,
      ubicacion: datosNuevoLugar.ubicacion,
      ciudad: datosNuevoLugar.ciudad,
      creador: req.id_usuario,
      estado: 'activo'
    })

    res.status(200).json({ message: 'Lugar insertado correctamente' });
  } catch (error) {
    console.error('Error al insertar lugar:', error);
    res.status(500).json({ error: 'Ocurrió un error al insertar el lugar' });
  }
};


const eliminarLugar = async (req, res) => {

  try {

    const codigo_lugar = req.body.codigo_lugar;
    const lugarActual = await lugar.findByPk(codigo_lugar);
    const id_usuario = req.id_usuario;
    console.log(id_usuario, typeof (id_usuario));
    console.log(lugarActual.descripcion, typeof (lugarActual.descripcion));

    if (lugarActual.creador !== id_usuario) {
      res.status(401).json({ error: "Usuario no autorizado" });
    }

    lugarActual.estado = 'inactivo';
    await lugarActual.save();

    res.status(200).json({ mensaje: "El lugar fue \"eliminado\" con exito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getLugares: getLugares,
  agregarLugar: agregarLugar,
  eliminarLugar: eliminarLugar
};
