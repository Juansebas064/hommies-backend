const express = require('express');
const routerLogin = express.Router();
const verifyGoogleLogin = require('../controllers/controladorModuloLogin.js');


routerLogin.post('/login/verify/google',verifyGoogleLogin);


module.exports = routerLogin;
