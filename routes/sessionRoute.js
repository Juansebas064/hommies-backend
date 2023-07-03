const express = require('express');
const routerJWT = express.Router();
const createJWT = require('../controllers/JWTController');


routerJWT.post('/create/JWT', createJWT);


module.exports = routerJWT;