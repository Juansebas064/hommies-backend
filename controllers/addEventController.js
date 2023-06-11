const { pool } = require('../api/db.js');
const evento = require('../models/evento.js');
const { generarIdentificadorUnico } = require('../api/db.js');
const jwt = require('jsonwebtoken');

//Codigo que a traves de una consulta SQL manda toda la informacion que el front proporciona y crea un nuevo evento en la base de datos
const agregarEvento = async (req, res) => {

  try {
    // const { codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre } = req.body;

    // await pool.query('INSERT INTO public.evento (codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre) VALUES($1, $2, $3, $4, $5, $6, $7);', [codigo_evento, descripcion, fecha, hora_inicio, hora_final, lugar, nombre]);

    const datosNuevoEvento = req.body;
    const codigo_evento = generarIdentificadorUnico()
    datosNuevoEvento.codigo_evento = codigo_evento
    console.log(datosNuevoEvento.codigo_evento)
    const { id } = jwt.verify(req.headers.authorization, 'ds1g3');
    console.log('Propietario del evento:', id)
    datosNuevoEvento.creador = id

    console.log('Datos para nuevo evento:', datosNuevoEvento)

    await evento.create({
      codigo_evento: datosNuevoEvento.codigo_evento,
      nombre: datosNuevoEvento.nombre,
      descripcion: datosNuevoEvento.descripcion,
      fecha: datosNuevoEvento.fecha,
      hora_inicio: datosNuevoEvento.hora_inicio,
      hora_final: datosNuevoEvento.hora_final,
      lugar: datosNuevoEvento.lugar,
      creador: datosNuevoEvento.creador
    })

    res.status(200).json({ mensaje: 'Evento agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el evento:', error);
    res.status(500).json({ error: 'Error al agregar el evento' });

  }
};


// PUT
const editarEvento = async (req, res) => {
  const codigo_evento = (req.params.codigo_evento).substring(1);

  const atributosActualizados = req.body;

  try {
    const eventoExistente = await evento.findByPk(codigo_evento);

    if (!eventoExistente) {
      return res.status(404).json({ message: 'El evento a editar no existe' });
    }
    const eventoActualizado = Object.assign(eventoExistente, atributosActualizados);

    await eventoActualizado.save();

    return res.status(200).json({ message: 'Evento actualizado exitosamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al actualizar el evento' });
  }
};

module.exports = {
  agregarEvento: agregarEvento,
  editarEvento: editarEvento
};