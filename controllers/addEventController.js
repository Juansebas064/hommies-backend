const { pool } = require('../api/db.js');
const evento = require('../models/evento.js');

//Codigo que a traves de una consulta SQL manda toda la informacion que el front proporciona y crea un nuevo evento en la base de datos
const agregarEvento = async (req, res) => {
    try {
        const { codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre } = req.body;

        await pool.query('INSERT INTO public.evento (codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre) VALUES($1, $2, $3, $4, $5, $6, $7);', [codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre]);


        res.status(200).json({ mensaje: 'Evento agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el evento:', error);
        res.status(500).json({ error: 'Error al agregar el evento' });

    }
};


const editarEvento = async (req, res) => {
    const codigo_evento = (req.params.codigo_evento).substring(1);
    const atributosActualizados = req.body;
    console.log(atributosActualizados);

    try {
        const eventoExistente = await evento.findByPk(codigo_evento);
        console.log(eventoExistente.nombre);

        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        const eventoActualizado = Object.assign(eventoExistente, atributosActualizados);
        console.log(eventoActualizado.nombre);
        await eventoActualizado.save();

        return res.status(200).json({ message: 'Evento actualizado exitosamente'});
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ message: 'Error al actualizar el evento' });
    }
};

module.exports = {
    agregarEvento: agregarEvento,
    editarEvento: editarEvento
};