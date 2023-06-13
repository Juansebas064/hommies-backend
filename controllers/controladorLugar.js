const { pool } = require("../api/db.js");
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

module.exports = {
  getLugares
};
