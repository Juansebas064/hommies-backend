const express = require('express');
const routerGetPlace = express.Router();
const routerAgregarLugar = express.Router()

const { getLugares, agregarLugar} = require('../controllers/controladorLugar.js')
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');

const upload = require('../api/multer.js')

routerGetPlace.get('/lugar/consultar', verificarAutenticacion, getLugares);
routerAgregarLugar.post('/lugar', upload.single("foto"), verificarAutenticacion ,agregarLugar);

module.exports = {
    routerGetPlace: routerGetPlace,
    routerAgregarLugar: routerAgregarLugar,
}
