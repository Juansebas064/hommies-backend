const { pool } = require('../api/db.js');

const getUserData = async (req, res) => {
  const { id } = req.body;

  try {
    // Consulta a la base de datos para obtener el usuario con el nickname proporcionado
    const query = `
          SELECT * FROM persona
          WHERE id = $1
          LIMIT 1
        `;
    const { rows } = await pool.query(query, [id]);

    // if (rows.length === 0) {
    //   return res.status(404).json({ error: 'El nickname no está registrado' });
    // }

    const usuario = {
      "id": rows[0].id,
      "tipo_de_usuario": rows[0].tipo_de_usuario,
      "nickname": rows[0].nickname,
      "nombre": rows[0].nombre,
      "apellido": rows[0].apellido,
      "genero": rows[0].genero,
      "foto": rows[0].foto,
      "correo_electronico": rows[0].correo_electronico,
      "fecha_nacimiento": rows[0].fecha_nacimiento,
      "descripcion": rows[0].descripcion,
      "ciudad": rows[0].ciudad
    }

    // El inicio de sesión fue exitoso
    res.status(200).json(usuario);

  } catch (error) {

    console.error('Error al realizar el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = getUserData;