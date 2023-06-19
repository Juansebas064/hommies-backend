const express = require('express');
const { agregarEvento, editarEvento, obtenerEventosC, anularInscipcionEvento, eliminarEvento, inscripcionEvento, obtenerListaParticipantes,  obtenerListaEventosLugar} = require('../controllers/controladorEvento.js');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

const routerAgregarEvento = express.Router();
const routerEditarEvento = express.Router();
const routerObtenerEventosC = express.Router();
const routerEliminar = express.Router();

const routerAnularInscripcionEvento = express.Router();
const routerInscripcionEvento = express.Router();
const routerObtenerParticipantes = express.Router();
const routerObtenerListaEventos = express.Router();


routerEditarEvento.put('/evento/editar/:codigo_evento', verificarAutenticacion, editarEvento);
routerAgregarEvento.post('/evento/agregar', verificarAutenticacion, agregarEvento);
routerObtenerEventosC.get('/evento/obtenerC', verificarAutenticacion, obtenerEventosC);
routerEliminar.post('/evento/eliminarEvento', verificarAutenticacion, eliminarEvento);
routerAnularInscripcionEvento.post('/evento/anular-inscripcion', verificarAutenticacion, anularInscipcionEvento);
routerInscripcionEvento.post('/evento/inscribirse', verificarAutenticacion, inscripcionEvento);
routerObtenerParticipantes.post('/evento/participantes', verificarAutenticacion, obtenerListaParticipantes);
routerObtenerListaEventos.post('/evento/evento-lugar/lista', verificarAutenticacion ,obtenerListaEventosLugar);



module.exports = {
  routerAgregarEvento: routerAgregarEvento,
  routerEditarEvento: routerEditarEvento,
  routerObtenerEventosC: routerObtenerEventosC,
  routerEliminar: routerEliminar,
  routerAnularInscripcionEvento: routerAnularInscripcionEvento,
  routerInscripcionEvento: routerInscripcionEvento,
  routerObtenerParticipantes: routerObtenerParticipantes,
  routerObtenerListaEventos: routerObtenerListaEventos,
};

