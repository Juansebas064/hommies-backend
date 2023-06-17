const express = require('express');
const { agregarEvento, editarEvento, obtenerEventosC, eliminarEvento} = require('../controllers/controladorEvento.js');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

const routerAgregarEvento = express.Router();
const routerEditarEvento = express.Router();
const routerObtenerEventosC = express.Router();
const routerEliminar = express.Router();



routerEditarEvento.put('/evento/editar/:codigo_evento', verificarAutenticacion, editarEvento);
routerAgregarEvento.post('/evento/agregar', verificarAutenticacion, agregarEvento);
routerObtenerEventosC.get('/evento/obtenerC', verificarAutenticacion, obtenerEventosC);
routerEliminar.post('/evento/eliminarEvento', verificarAutenticacion, eliminarEvento);



module.exports = {
  routerAgregarEvento: routerAgregarEvento,
  routerEditarEvento: routerEditarEvento,
  routerObtenerEventosC: routerObtenerEventosC,
  routerEliminar: routerEliminar
};

