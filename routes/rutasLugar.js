const express = require('express');
const routerGetPlace = express.Router();
const routerAgregarLugar = express.Router();
const routerEliminarLugar = express.Router();
const routerListarLugares = express.Router();

const { getLugares, agregarLugar, eliminarLugar, listarLugares} = require('../controllers/controladorLugar.js');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

const upload = require('../api/multer.js')

const optionalUpload = (req, res, next) => {
    if (!req.file) {
      // Si no se proporciona un archivo, asignar `undefined` a `req.file` para que no cause errores
      req.file = undefined;
    }
  
    next();
  };

routerGetPlace.get('/lugar/consultar', verificarAutenticacion, getLugares);
routerAgregarLugar.post('/lugar/crear', optionalUpload ,upload.single("foto"), verificarAutenticacion ,agregarLugar);
routerEliminarLugar.post('/lugar/eliminar', verificarAutenticacion, eliminarLugar);
routerListarLugares.get('/lugar/listar', verificarAutenticacion, listarLugares);

module.exports = {
    routerGetPlace: routerGetPlace,
    routerAgregarLugar: routerAgregarLugar,
    routerEliminarLugar: routerEliminarLugar,
    routerListarLugares: routerListarLugares
}
