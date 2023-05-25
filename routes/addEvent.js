const express = require('express');

const {agregarEvento} = require('../controllers/addEvent.js');

const routerEvento = express.Router();

routerEvento.post('/evento/agregar',(req, res) => {
    agregarEvento;
});

