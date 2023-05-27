const {pool} = require('../api/db.js');

const validarSesion = async (req, res) => {
    const {nickname, password} = req.body;

    try {
        // Consulta a la base de datos para obtener el usuario con el nickname proporcionado
        const query = `
          SELECT * FROM persona
          WHERE nickname = $1
          LIMIT 1
        `;
        const { rows } = await pool.query(query, [nickname]);
    
        if (rows.length === 0) {
          return res.status(404).json({ error: 'El nickname no está registrado', isLogged: false });
        }
    
        // Verificar si la contraseña coincide
        if (rows[0].contraseña !== password) {
          return res.status(401).json({ error: 'La contraseña es incorrecta', isLogged: false });
        }

        const usuario = {
            "isLogged": true,
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
            "likes": rows[0].likes,
            "ciudad": rows[0].ciudad
        }
    
        // El inicio de sesión fue exitoso
        res.status(200).json(usuario);

      } catch (error) {
        
        console.error('Error al realizar el inicio de sesión:', error);
        res.status(500).json({ error: 'Error del servidor' });
      }
};

module.exports = validarSesion;