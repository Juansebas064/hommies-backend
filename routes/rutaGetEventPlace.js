const express = require('express');
const routerGetEventPlace = express.Router();
const {getEventoLugar, getLugar} = require('../controllers/getSelectedEventPlace.js')

routerGetEventPlace.get('/evento/:codigoEvento', getEventoLugar)

routerGetEventPlace.get('/evento/lugar/:codigoLugar', getLugar)

module.exports = routerGetEventPlace