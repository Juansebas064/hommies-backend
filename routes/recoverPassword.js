const express = require('express');
const routerRecoverPass = express.Router();
const routerRecoverPassToken = express.Router();
const {recuperarPassToken, recuperarPass} = require('../controllers/recoverPassword.js');


routerRecoverPass.post('/usuario/recuperar-cuenta', recuperarPass);
routerRecoverPassToken.post('/usuario/recuperar-cuenta-token', recuperarPassToken);


module.exports = {
    routerRecoverPass: routerRecoverPass,
    routerRecoverPassToken: routerRecoverPassToken,
}

