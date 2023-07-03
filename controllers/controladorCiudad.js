const { pool } = require("../api/db.js");

const getCiudad = async (req, res) => {

  try {

    const query = "select c.* from ciudad c inner join persona p on c.codigo_ciudad = p.ciudad where p.id = $1"
    const values = [req.id_usuario]

    const ciudad = await pool.query(query, values);

    if (!ciudad) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    res.status(200).json(ciudad);

  } catch (error) {
    console.error("Error al realizar la solicitud de ciudad:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos de ciudad" });
  }
}

module.exports = {
  getCiudad: getCiudad,
}