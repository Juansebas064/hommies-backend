const express = require('express');

const verificarAutenticacion = (req, res, next) => {

    const token = req.headers.authorization;

    // Verificar la validez del token
    if (!token) {
        return res.status(401).json({ mensaje: 'No se proporcionó un token de autenticación' });
    }

    try {
        // Decodificar la información del token
        const decodedToken = jwt.verify(token, 'ds1g3'); // Utiliza tu propia clave secreta del token

        // Verificar la autenticidad del usuario
        const id = decodedToken.id; // Supongamos que el token contiene el ID del usuario

        // Aquí puedes realizar la lógica necesaria para verificar la autenticidad del usuario, por ejemplo, consultando la base de datos

        // Si el usuario es auténtico, puedes establecer la información del usuario en el objeto 'req' para que esté disponible en las rutas y controladores
        req.id = id;

        // Llamar a 'next()' para permitir que la solicitud continúe al controlador correspondiente
        next();
    } catch (error) {
        // Si el token no es válido o ha expirado
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarAutenticacion;