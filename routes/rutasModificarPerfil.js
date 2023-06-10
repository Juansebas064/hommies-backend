const express = require('express');

const routerModificar = express.Router();

const modificarPerfil = require('../controllers/controladorModuloModificarPerfil.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

routerModificar.put('/perfil/modificar', verificarAutenticacion, modificarPerfil);

module.exports = routerModificar;
