const express = require('express');
const routerModificar = express.Router();
const modificarPerfil = require('../controllers/controladorModuloModificarPerfil.js');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');
const { uploadAvatars } = require('../api/multer.js');

routerModificar.put('/perfil/modificar', (req, res, next) => {
  if (!req.file) {
    return next();
  }
  uploadAvatars.single('foto')(req, res, next);
}, verificarAutenticacion, modificarPerfil);

module.exports = routerModificar;
