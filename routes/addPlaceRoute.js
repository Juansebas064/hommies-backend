const express = require('express')
const routerAgregarLugar = express.Router()
const upload = require('../api/multer.js')

const agregarLugar = require('../controllers/addPlaceController.js')

routerAgregarLugar.post('/agregar/lugar', upload.single('foto'), agregarLugar);


module.exports = routerAgregarLugar;