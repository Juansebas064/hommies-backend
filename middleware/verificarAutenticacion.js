import pkg from 'jsonwebtoken';
const { verify } = pkg;
import persona from '../models/persona.js';

const verificarAutenticacion = async (req, res, next) => {
  const token = req.headers.authorization;

  // Verificar la validez del token
  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token de autenticación' });
  }

  try {
    // Decodificar la información del token
    const decodedToken = verify(token, 'ds1g3'); // Utiliza tu propia clave secreta del token

    // Verificar la autenticidad del usuario
    const { id } = decodedToken;

    const personaRegistrada = await persona.findByPk(id);

    if (!personaRegistrada) {
      res.status(500).json({ error: 'La persona no esta registrada' });
    }

    req.id_usuario = id;
    // Llamar a 'next()' para permitir que la solicitud continúe al controlador correspondiente
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado
    console.error(error);
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

export default verificarAutenticacion;