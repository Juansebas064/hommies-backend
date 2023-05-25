const { pool } = require('../api/db.js');

const agregarEvento = async (req, res) => {
    try {
        const { codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar } = req.body;

        await pool.query('INSERT INTO eventos (codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar) VALUES ($1, $2, $3, $4, $5, $6)',
            [codigo_evento, Descripcion, Fecha, HoraInicio, HoraFinal, Lugar]);

        res.status(200).json({ mensaje: 'Evento agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el evento:', error);
        res.status(500).json({ error: 'Error al agregar el evento' });

    }
};

module.exports = agregarEvento;