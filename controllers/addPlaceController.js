const {pool} = require('../api/db.js')
const lugar = require('../models/lugar.js')
const upload = require('../api/multer.js')

const agregarLugar = async (req, res) => {
    
    try {
        const { codigo_lugar, nombre, direccion, aforo, descripcion, ubicacion, ciudad } = req.body;
        const foto = req.file.path; // Obtén la ruta de la imagen generada por Multer
        
        
        const query = 'INSERT INTO public.lugar (codigo_lugar, nombre, direccion, aforo, foto, descripcion, ubicacion, ciudad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [codigo_lugar, nombre, direccion, aforo, foto, descripcion, ubicacion, ciudad];
        
        await pool.query(query, values);
        
        res.status(200).json({ message: 'Lugar insertado correctamente' });
      } catch (error) {
        console.error('Error al insertar lugar:', error);
        res.status(500).json({ error: 'Ocurrió un error al insertar el lugar' });
      }
    };


module.exports = agregarLugar;