import { Router } from 'express';
const routerGetPlace = Router();
const routerAgregarLugar = Router();
const routerEliminarLugar = Router();
const routerListarLugares = Router();

import { getLugares, agregarLugar, eliminarLugar, listarLugares } from '../controllers/controladorLugar.js';
import verificarAutenticacion from '../middleware/verificarAutenticacion.js';

import { upload } from '../api/multer.js';

const optionalUpload = (req, res, next) => {
  if (!req.file) {
    // Si no se proporciona un archivo, asignar `undefined` a `req.file` para que no cause errores
    req.file = undefined;
  }

  next();
};

routerGetPlace.get('/lugar/consultar', verificarAutenticacion, getLugares);
routerAgregarLugar.post('/lugar/crear', optionalUpload, upload.single("foto"), verificarAutenticacion, agregarLugar);
routerEliminarLugar.post('/lugar/eliminar', verificarAutenticacion, eliminarLugar);
routerListarLugares.get('/lugar/listar', verificarAutenticacion, listarLugares);

export {
  routerGetPlace,
  routerAgregarLugar,
  routerEliminarLugar,
  routerListarLugares,
}