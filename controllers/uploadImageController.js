import { Router } from 'express';
const router = Router();
import { single } from '../api/multer.js';
import { pool } from '../config/db.js';
import { join, dirname } from 'path';


router.post('../img', single('file'), (req, res) => {

    const rutaImagen = req.file.path;
    const query = ''

});
