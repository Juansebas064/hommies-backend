const express = require('express');

const routerModificarInteres = express.Router();
const routerGetIntereses = express.Router();
const routerInteresesUsuario = express.Router();
const routerInteresesEvento = express.Router();
const routerGetInteresesEvento = express.Router();


const { interesesUsuario, getAllIntereses, modificarIntereses, modificarInteresesEvento, interesesEvento } = require('../controllers/controladorIntereses.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');


routerModificarInteres.post('/persona/intereses/modificar', verificarAutenticacion, modificarIntereses);
routerGetIntereses.get('/intereses/consultar', verificarAutenticacion, getAllIntereses);
routerInteresesUsuario.get('/persona/intereses/consultar', verificarAutenticacion, interesesUsuario);
routerInteresesEvento.post('/evento/intereses/modificar', verificarAutenticacion, modificarInteresesEvento);
routerGetInteresesEvento.post('/evento/intereses/consultar', verificarAutenticacion, interesesEvento);


module.exports = {
  routerModificarInteres: routerModificarInteres,
  routerGetIntereses: routerGetIntereses,
  routerInteresesUsuario: routerInteresesUsuario,
  routerInteresesEvento: routerInteresesEvento,
  routerGetInteresesEvento: routerGetInteresesEvento
};