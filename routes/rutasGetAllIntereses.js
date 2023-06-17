const express = require('express');

const routerGetIntereses = express.Router();

const allIntereses = require('../controllers/controladorObtenerAllIntereses.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

routerGetIntereses.get('/obtener/intereses', verificarAutenticacion, allIntereses);

module.exports = routerGetIntereses;
