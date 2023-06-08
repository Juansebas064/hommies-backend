const express = require('express')
const router = express.Router();
const upload = require('../api/multer.js')
const {pool} = require('../api/db.js')

router.post('../img', upload.single('file'), (req, res) =>{

    const rutaImagen = req.file.path;

    const query = ''

})