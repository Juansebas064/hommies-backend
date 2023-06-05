const jwt = require('jsonwebtoken');
const {pool} = require('../api/db.js');

const verificarAutenticacion = async (req, res, next) => {
    console.log(req.body);
    const token = req.headers.authorization;

    // Verificar la validez del token
    if (!token) {
        return res.status(401).json({ mensaje: 'No se proporcionó un token de autenticación' });
    }

    try {
        // Decodificar la información del token
        const decodedToken = jwt.verify(token, 'ds1g3'); // Utiliza tu propia clave secreta del token

        // Verificar la autenticidad del usuario
        const id = decodedToken;

        const query = `
          SELECT * FROM persona
          WHERE id = $1
          LIMIT 1
        `;
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
          return res.status(404).json({ error: 'El id no es valido', isLogged: false });
        }

        req.id = id;
        // Llamar a 'next()' para permitir que la solicitud continúe al controlador correspondiente
        next();
    } catch (error) {
        // Si el token no es válido o ha expirado
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarAutenticacion;