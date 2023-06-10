const express = require('express');

const routerEliminar = express.Router();

const eliminarEvento = require('../controllers/controladorModuloEliminarEvento.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

routerEliminar.post('/evento/eliminarEvento', verificarAutenticacion, eliminarEvento);

module.exports = routerEliminar;
