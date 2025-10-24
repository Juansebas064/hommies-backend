import { Router } from 'express';
import { EventosParaNavBar, agregarEvento, editarEvento, obtenerEventosC, anularInscipcionEvento, eliminarEvento, inscripcionEvento, obtenerListaParticipantes, obtenerListaEventosLugar } from '../controllers/controladorEvento.js';
import verificarAutenticacion from '../middleware/verificarAutenticacion.js';

const routerAgregarEvento = Router();
const routerEditarEvento = Router();
const routerObtenerEventosC = Router();
const routerEliminar = Router();

const routerAnularInscripcionEvento = Router();
const routerInscripcionEvento = Router();
const routerObtenerParticipantes = Router();
const routerObtenerListaEventos = Router();
const routerEventosParaNavBar = Router();


routerEditarEvento.put('/evento/editar/:codigo_evento', verificarAutenticacion, editarEvento);
routerAgregarEvento.post('/evento/agregar', verificarAutenticacion, agregarEvento, inscripcionEvento);
routerObtenerEventosC.get('/evento/obtenerC', verificarAutenticacion, obtenerEventosC);
routerEliminar.post('/evento/eliminarEvento', verificarAutenticacion, eliminarEvento);
routerAnularInscripcionEvento.post('/evento/anular-inscripcion', verificarAutenticacion, anularInscipcionEvento);
routerInscripcionEvento.post('/evento/inscribirse', verificarAutenticacion, inscripcionEvento);
routerObtenerParticipantes.post('/evento/participantes', verificarAutenticacion, obtenerListaParticipantes);
routerObtenerListaEventos.post('/evento/evento-lugar/lista', verificarAutenticacion, obtenerListaEventosLugar);
routerEventosParaNavBar.get('/navbar/get/lista', verificarAutenticacion, EventosParaNavBar);

export {
  routerAgregarEvento,
  routerEditarEvento,
  routerObtenerEventosC,
  routerEliminar,
  routerAnularInscripcionEvento,
  routerInscripcionEvento,
  routerObtenerParticipantes,
  routerObtenerListaEventos,
  routerEventosParaNavBar
}

