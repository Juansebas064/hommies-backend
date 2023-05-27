const {pool} = require('../api/db.js');

const validarSesion = async (req, res) => {
    console.log(req.body)
    const {nickname, contraseña} = req.body;

    try {
        // Consulta a la base de datos para obtener el usuario con el nickname proporcionado
        const query = `
          SELECT * FROM persona
          WHERE nickname = $1
          LIMIT 1
        `;
        const { rows } = await pool.query(query, [nickname]);
    
        if (rows.length === 0) {
          return res.status(404).json({ error: 'El nickname no está registrado' });
        }
    
        // Verificar si la contraseña coincide
        if (rows[0].contraseña !== contraseña) {
          return res.status(401).json({ error: 'La contraseña es incorrecta' });
        }
    
        // El inicio de sesión fue exitoso
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } catch (error) {
        
        console.error('Error al realizar el inicio de sesión:', error);
        res.status(500).json({ error: 'Error del servidor' });
      }
};

module.exports = validarSesion;