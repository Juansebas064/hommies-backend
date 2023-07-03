const express = require('express');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');
const {getCiudad} = require('../controllers/controladorCiudad')
const routerGetCiudad = express.Router();

routerGetCiudad.get('/ciudad/obtener',verificarAutenticacion, getCiudad)


module.exports = {
    routerGetCiudad: routerGetCiudad,
}