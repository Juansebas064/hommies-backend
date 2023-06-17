const express = require('express');

const routerModificarInteres = express.Router();
const routerGetIntereses = express.Router();
const routerInteresesUsuario = express.Router();

const { interesesUsuario, getAllIntereses, modificarIntereses } = require('../controllers/controladorIntereses.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');


routerModificarInteres.post('/persona/intereses/modificar', verificarAutenticacion, modificarIntereses);
routerGetIntereses.get('/intereses/consultar', verificarAutenticacion, getAllIntereses);
routerInteresesUsuario.get('/persona/intereses/consultar', verificarAutenticacion, interesesUsuario);


module.exports = {
  routerModificarInteres: routerModificarInteres,
  routerGetIntereses: routerGetIntereses,
  routerInteresesUsuario: routerInteresesUsuario
};