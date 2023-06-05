const express = require('express');
const routerAgregarEvento = express.Router();
const {agregarEvento, editarEvento} = require('../controllers/addEventController.js');

const routerEditarEvento = express.Router();
const verificarAutenticacion =require('../middleware/verificarAutenticacion.js');

routerEditarEvento.put('/evento/editar/:codigo_evento', editarEvento);


routerAgregarEvento.post('/evento/agregar', verificarAutenticacion, agregarEvento);

module.exports = {
    routerAgregarEvento: routerAgregarEvento,
    routerEditarEvento: routerEditarEvento
};

