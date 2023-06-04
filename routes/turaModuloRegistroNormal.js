const express = require('express');

const routerNormalRegister = express.Router();

const normalRegister = require('../controllers/controladorModuloRegistroNormal.js');



routerNormalRegister.post('/register/user',normalRegister);


module.exports =routerNormalRegister;
