const express = require('express');

const routerEvento = express.Router();

const agregarEvento = require('../controllers/addEventController.js');


routerEvento.post('/evento/agregar', agregarEvento);

module.exports = routerEvento;

