const express = require('express');
const routerGetCiudad = express.Router();

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');
const {getCiudad} = require('../controllers/controladorCiudad')

routerGetCiudad.get('/ciudad/obtener',verificarAutenticacion, getCiudad)

module.exports = {
    routerGetCiudad: routerGetCiudad,
}