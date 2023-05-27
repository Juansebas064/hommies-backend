const express = require('express');
const routerLogin = express.Router();

const validarSesion = require('../controllers/loginController.js');

routerLogin.post('/validar', validarSesion);

module.exports.routerLogin = routerLogin;