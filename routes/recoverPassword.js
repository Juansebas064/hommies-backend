const express = require('express');
const routerRecoverPass = express.Router();
const recoverPass = require('../controllers/recoverPassword.js');


routerRecoverPass.post('/usuario/recuperar-cuenta', recoverPass);


module.exports = routerRecoverPass;

