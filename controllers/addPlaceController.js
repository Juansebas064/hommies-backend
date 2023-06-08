const {pool} = require('../api/db.js')
const lugar = require('../models/lugar.js')
const upload = require('../api/multer.js')

const agregarLugar = async (req, res) => {
    
    

    try {
        const { codigo_lugar, nombre, direccion, aforo, descripcion, ubicacion, lugar } = req.body;

        const foto = req.file ? req.file.path : null;


        await pool.query('INSERT INTO public.lugar (codigo_lugar, nombre, direccion, aforo, foto, descripcion, ubicacion, ciudad) VALUES($1, $2, $3, $4, $5, $6, $7, $8);', [codigo_lugar, nombre, direccion, aforo, foto, descripcion, ubicacion, lugar]);


        res.status(200).json({ mensaje: 'Lugar agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el lugar:', error);
        res.status(500).json({ error: 'Error al agregar el lugar' });

    }
};


module.exports = agregarLugar;