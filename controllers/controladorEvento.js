const { pool } = require('../api/db.js');
const { generarIdentificadorUnico, uuidEventoParticipa } = require('../api/db.js');
const jwt = require('jsonwebtoken');
const evento = require('../models/evento.js');
const persona = require('../models/persona.js');

//Codigo que a traves de una consulta SQL manda toda la informacion que el front proporciona y crea un nuevo evento en la base de datos
const agregarEvento = async (req, res, next) => {

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
      creador: req.id_usuario
    })

    //res.status(200).json({ mensaje: 'Evento agregado exitosamente', idEvento: codigo_evento });

    req.body.codigo_evento = datosNuevoEvento.codigo_evento

    next()

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



//Metodos de logica para el filtrado de lugares por interes de persona
//NOTA: COMO NO SE PUEDE UTILIZAR UN CONTROLARO EN oTRO, SE DEBERA DE CREAR METODOS APARTE

const obtenerSoloEventosId = (eventos) => {

  const eventosId = eventos.map(function(elemento) {

    return elemento.codigo_evento;
  } );

  return eventosId;

}




const obtenerInteresesEventos = async (eventosId) =>{


  const interesesEventos1 = await eventosId.map(async function(elemento) {

    try {
     // console.log(elemento)
     // const query = 'select i.* from interes AS i inner join interes_evento AS ie on i.codigo_interes = ie.interes where ie.evento  = $1;';
      const intereses = await pool.query(`select i.* from interes AS i inner join interes_evento AS ie on i.codigo_interes = ie.interes where ie.evento  = '${elemento}';`);
  
      if (!intereses.rowCount) {
        return "el evento no tiene intereses, como raro a estas alturas";
      }

      //console.log(intereses)
      return intereses.rows;
    } catch (error) {
      console.log(error);
      console.log("error en la consulta de intereses eventos");
    }


  });

  const interesesEventos = Promise.all(interesesEventos1);
  return interesesEventos;

}

const obtenerInteresesPersona = async (personaId) => {


  try {

    const respuesta = await pool.query(`SELECT interes FROM interes_persona WHERE (persona = '${personaId}')`);
     // console.log(respuesta);

    return respuesta.rows;


  } catch (error) {

    console.log(error);
  }
  


}

//funcion la cual normalizara el json para que pueda ser compatible con 
const normalizarJson =(iEvento) => {

 // console.log(iEvento);

  const jsonNormalizado = iEvento.map(function(elemento) {

    const elemento1 = Object.values(elemento);

    const yanose = elemento1.map(function(elemento2) {

      return {'interes':elemento2.codigo_interes, 'nombre': elemento2.nombre};

    });
    return yanose;


  });

  return jsonNormalizado;

}


const compararIntereses = (eventos, iEvento, iPersona ) => {

  const interesesEventoNormalizados = normalizarJson(iEvento);

  let contador = 0;
  const eventosFiltrados = []; //array definitivo

  //console.log(interesesEventoNormalizados);

  interesesEventoNormalizados.forEach(element => {

     // console.log(element);

      const tieneElementoComun = iPersona.some(obj1 => element.some(obj2 => obj2.interes === obj1.interes));

   //   console.log(tieneElementoComun);


      if(tieneElementoComun) {

       
        const nuevoRegistro = {...eventos[contador], ...{intereses: element}};
        
        eventosFiltrados.push(nuevoRegistro);

        contador++;
 
      } else {

        contador++;
      }

  });

  return eventosFiltrados;
}

const obtenerAllEI = (eventos, iEvento) => {

  const interesesEventoNormalizados = normalizarJson(iEvento);
 
  const eventosFiltrados = []; //array definitivo
  let contador=0;

  interesesEventoNormalizados.forEach(element => {
    
        const nuevoRegistro = {...eventos[contador], ...{intereses: element}};
        
        eventosFiltrados.push(nuevoRegistro);

        contador++;
  });
  return eventosFiltrados;
}


const obtenerEventosC = async (req, res) => {

  try {
    const query = 'select e.* from evento e inner join lugar l on e.lugar = l.codigo_lugar inner join persona p on l.ciudad = p.ciudad where p.id = $1 order by e.fecha';
    const persona = [req.id_usuario];
    const eventos = await pool.query(query, persona);

   // console.log(persona);
    

    if (!eventos) {
      res.status(404).json({ error: 'eventos en la misma ciudad no encontrados' });
    }

    
    const eventosId = obtenerSoloEventosId(eventos.rows);
//    console.log(eventosId);

    const interesesEventos = await obtenerInteresesEventos(eventosId);
  //  console.log(interesesEventos);

    
    const interesesPersona = await obtenerInteresesPersona(persona);
 //   console.log(interesesPersona);

    const eventosFiltrados = compararIntereses(eventos.rows, interesesEventos, interesesPersona);

    eventos.rows = eventosFiltrados;


    eventos.rowCount= eventosFiltrados.length;


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

    res.status(200).json({ message: 'Persona inscrita correctamente', idEvento: evento })


  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Error al inscribirse al evento' })
  }

}


const obtenerListaParticipantes = async (req, res) => {
  try {
    const codigo_evento = req.body.codigo_evento;
    const query = 'select p.* from persona p inner join evento_participa ep on p.id = ep.persona where ep.evento = $1';
    const participantes = await pool.query(query, [codigo_evento]);

    const eventoActual = await evento.findByPk(codigo_evento);

    let participantesOrganizar = JSON.parse(JSON.stringify(participantes));

    const creador = participantesOrganizar.rows.filter(e => e.id === eventoActual.creador);

    const participantesSinCreador = participantesOrganizar.rows.filter(e => e.id !== eventoActual.creador);

    participantesOrganizar.rows = creador.concat(participantesSinCreador);

    res.status(200).json(participantesOrganizar);

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



const EventosParaNavBar = async (req, res) => {

  try {
    const listaEventos = await pool.query('SELECT * FROM  evento');

    const eventosId = obtenerSoloEventosId(listaEventos.rows);

    const interesesEvento = await obtenerInteresesEventos(eventosId);
    

    const eventosConIntereses = obtenerAllEI (listaEventos.rows, interesesEvento);

    listaEventos.rowCount = eventosConIntereses.length;
    listaEventos.rows = eventosConIntereses;


    res.status(200).json(listaEventos); 


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
  obtenerListaEventosLugar: obtenerListaEventosLugar,
  EventosParaNavBar,EventosParaNavBar
};