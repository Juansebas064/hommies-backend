const { pool } = require('../api/db.js');
const { generarIdentificadorUnico, uuidEventoParticipa } = require('../api/db.js');
const jwt = require('jsonwebtoken');
const evento = require('../models/evento.js');

//Codigo que a traves de una consulta SQL manda toda la informacion que el front proporciona y crea un nuevo evento en la base de datos
const agregarEvento = async (req, res) => {

  try {

    const datosNuevoEvento = req.body;
    const codigo_evento = generarIdentificadorUnico();
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

    res.status(200).json({ mensaje: 'Evento agregado exitosamente', idEvento: codigo_evento });
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

const obtenerEventosC = async (req, res) => {

  try {
    const query = 'select e.* from evento e inner join lugar l on e.lugar = l.codigo_lugar inner join persona p on l.ciudad = p.ciudad where p.id = $1 order by e.fecha';
    const values = [req.id_usuario];
    const eventos = await pool.query(query, values);

    if (!eventos) {
      res.status(404).json({ error: 'eventos en la misma ciudad no encontrados' });
    }

    res.status(200).json(eventos);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor en obtenerEventosC' });
  }
};



//ELIMINAR EVENTO


const eliminarDeParticipa = async (idEvento) => {


  try {

    const respuesta = await pool.query(`DELETE FROM evento_participa WHERE (evento = '${idEvento}')`);

    console.log(respuesta);


  } catch (error) {

    console.log(error);
  }


}

const eliminarDeintereses = async (idEvento) => {

  try {

    const respuesta = await pool.query(`DELETE FROM interes_evento WHERE (evento = '${idEvento}')`);

    console.log(respuesta);

  } catch (error) {

    console.log(error);
  }


}



const eliminarEvento = async (req, res) => {


  const atributosActualizados = req.body;

  // console.log(atributosActualizados);

  try {
    const eventoExistente = await evento.findByPk(req.body.codigo_evento);

    if (!eventoExistente) {

      return res.status(404).json({ message: 'El evento a eliminar no existeeeeee' });
    }

    await eliminarDeParticipa(req.body.codigo_evento);
    await eliminarDeintereses(req.body.codigo_evento);
    await eventoExistente.destroy();




    return res.status(200).json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al eliminar el evento' });
  }
};



const anularInscipcionEvento = async (req, res) => {
  try {

    const eventoAnular = await evento.findByPk(req.body.codigo_evento);

    if (!eventoAnular) {
      res.status(404).json({ error: 'El usuario no esta inscrito a este evento' });
    }

    const query = 'DELETE FROM evento_participa WHERE persona = $1 AND evento = $2;';
    const datos = [req.id_usuario, req.body.codigo_evento];

    await pool.query(query, datos);

    res.status(200).json({ mensaje: 'Anulacion de inscripcion exitosa' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'error en el servidor' });
  }
}


const inscripcionEvento = async (req, res) => {


  try {
    const evento = req.body.codigo_evento;
    const persona = req.id_usuario
    const codigo_evento_participa = uuidEventoParticipa();

    const query = 'INSERT INTO public.evento_participa (codigo_evento_participa, persona, evento) VALUES($1, $2, $3);';
    const values = [codigo_evento_participa, persona, evento]

    await pool.query(query, values);

    res.status(200).json({ message: 'Persona inscrita correctamente' })


  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error al inscribirse al evento' })
  }

}


const obtenerListaParticipantes = async (req, res) => {
  try {
    const codigo_evento = req.body.codigo_evento
    const query = 'select p.* from persona p inner join evento_participa ep on p.id = ep.persona where ep.evento = $1'
    const participantes = await pool.query(query, [codigo_evento])

    res.status(200).json(participantes)

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error al obtener la lista de participantes' })
  }
}


const obtenerListaEventosLugar = async (req, res) => {
  try {

    const codigo_lugar = req.body.codigo_lugar
    const query = 'SELECT nombre FROM public.evento WHERE lugar = $1;'
    const listaEventos = await pool.query(query, [codigo_lugar])

    res.status(200).json(listaEventos)

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error al obtener la lista de eventos' })
  }
}


module.exports = {
  agregarEvento: agregarEvento,
  editarEvento: editarEvento,
  obtenerEventosC: obtenerEventosC,
  eliminarEvento: eliminarEvento,
  anularInscipcionEvento: anularInscipcionEvento,
  inscripcionEvento: inscripcionEvento,
  obtenerListaParticipantes: obtenerListaParticipantes,
  obtenerListaEventosLugar: obtenerListaEventosLugar
};