const express = require('express');
const routerRecoverPass = express.Router();
const routerRecoverPassToken = express.Router();
const routerChangePass = express.Router();
const {recuperarPassToken, recuperarPass, cambiarPass} = require('../controllers/recoverPassword.js');


routerRecoverPass.post('/usuario/recuperar-cuenta', recuperarPass);
routerRecoverPassToken.post('/usuario/recuperar-cuenta-token', recuperarPassToken);
routerChangePass.post('/usuario/cambiar-contraseña', cambiarPass)

module.exports = {
    routerRecoverPass: routerRecoverPass,
    routerRecoverPassToken: routerRecoverPassToken,
    routerChangePass: routerChangePass,
}

