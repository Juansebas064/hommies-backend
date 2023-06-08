const express = require('express');

const routerRegister = express.Router();

const googleRegister = require('../controllers/controladorModuloRegistroGoogle.js');

routerRegister.post('/register/verify/google',googleRegister);

module.exports = routerRegister;
