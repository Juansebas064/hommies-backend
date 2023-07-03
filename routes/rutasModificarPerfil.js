const express = require('express');
const multer = require('multer')
const routerModificar = express.Router();
const modificarPerfil = require('../controllers/controladorModuloModificarPerfil.js');
const verificarAutenticacion = require('../middleware/verificarAutenticacion.js');
const { uploadAvatars } = require('../api/multer.js');

routerModificar.put('/perfil/modificar', (req, res, next) => {
  uploadAvatars.single('foto')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // Ocurrió un error con Multer al subir el archivo
      return next(error);
    } else if (error) {
      // Ocurrió un error general
      return next(error);
    }

   
    next();
  });
}, verificarAutenticacion, modificarPerfil);

module.exports = routerModificar;
