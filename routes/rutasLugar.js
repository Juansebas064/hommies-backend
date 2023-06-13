const express = require('express');
const routerGetPlace = express.Router();
const { getLugares } = require('../controllers/controladorLugar.js')
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

routerGetPlace.get('/lugar/consultar', verificarAutenticacion, getLugares)

module.exports = routerGetPlace