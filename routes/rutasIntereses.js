const express = require('express');

const routerRegistroInteres = express.Router();

const registrarInteres = require('../controllers/controladorModuloRegistrarInteres.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

routerRegistroInteres.post('/registrar/intereses', verificarAutenticacion, registrarInteres);

module.exports = routerRegistroInteres;
