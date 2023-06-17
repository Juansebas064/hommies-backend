const express = require('express');

const routerModificarInteres = express.Router();
const routerGetIntereses = express.Router();
const routerInteresesUsuario = express.Router();

const {interesesUsuario,getAllIntereses,modificarIntereses } = require('../controllers/controladorIntereses.js');

const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');


routerModificarInteres.post('/modificar/intereses', verificarAutenticacion, modificarIntereses);
routerGetIntereses.get('/obtener/intereses', verificarAutenticacion, getAllIntereses);
routerInteresesUsuario.post('/intereses/usuario', verificarAutenticacion, interesesUsuario);


module.exports = {
    routerModificarInteres: routerModificarInteres,
    routerGetIntereses: routerGetIntereses,
    routerInteresesUsuario: routerInteresesUsuario
};