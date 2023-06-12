const { pool } = require("../api/db.js");

const getEventoLugar = async (req, res) => {
  const codigoEvento = req.params.codigoEvento;
  try {
    const respuesta = await pool.query(
      "SELECT lugar FROM public.evento WHERE codigo_evento = $1;",
      [codigoEvento]
    );
    if (respuesta.rows.length > 0) {
      const lugar = respuesta.rows[0].lugar;
      res.status(200).json({ lugar });
    } else {
      // Manejar el caso de respuesta nula
      console.log("No se pudo obtener la respuesta del backend");
      res.status(404).json({ mensaje: "No se encontró el evento" });
    }
  } catch (error) {
    console.error("Error al realizar la solicitud al backend:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos del lugar" });
  }
};

const getLugar = async (req, res) => {
  const codigoLugar = req.params.codigoLugar;
  try {
    const respuestaLugar = await pool.query(
      "SELECT codigo_lugar, nombre, foto, descripcion FROM public.lugar WHERE codigo_lugar = $1;",
      [codigoLugar]
    );
    if (respuestaLugar.rows.length > 0) {
      const lugar = respuestaLugar.rows[0];
      res.status(200).json(lugar);
    } else {
      // Manejar el caso de respuesta nula
      console.log("No se pudo obtener la respuesta del backend");
      res.status(404).json({ mensaje: "No se encontró el lugar" });
    }
  } catch (error) {
    console.error("Error al realizar la solicitud al backend:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos del lugar" });
  }
};

module.exports = {
  getEventoLugar,
  getLugar,
};
