import { Router } from 'express';
import verificarAutenticacion from '../middleware/verificarAutenticacion.js';
import getCiudad from '../controllers/controladorCiudad.js';
const routerGetCiudad = Router();

routerGetCiudad.get('/ciudad/obtener', verificarAutenticacion, getCiudad)


export default routerGetCiudad;