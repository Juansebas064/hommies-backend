const { pool } = require('../api/db.js');


const getAllIntereses = async (req, res) => {

  try {
    const respuesta = await pool.query(`SELECT * FROM interes`);

    res.send(respuesta.rows);

  } catch (error) {

    console.log(error);
  }
};

const interesesUsuario = async (req, res) => {

  try {
    const query = 'select i.* from interes i inner join interes_persona ip on i.codigo_interes = ip.interes where ip.persona  = $1;'
    const intereses = await pool.query(query, [req.id_usuario]);

    if (!intereses) {
      res.status(204).json({ mensaje: 'El usuario no tiene intereses' });
    }

    res.status(200).json(intereses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


const interesesEvento = async (req, res) => {

  try {
    const query = 'select i.* from interes i inner join interes_evento ie on i.codigo_interes = ie.interes where ie.evento  = $1;'
    const intereses = await pool.query(query, [req.body.codigo_evento]);

    if (!intereses) {
      res.status(204).json({ mensaje: 'El evento no tiene intereses' });
    }

    res.status(200).json(intereses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}







//-------------------//REGISTRO Y MODIFICACION DE INTERESES\\------------------------\\ 

//----//SE REUTILIZO TODO EL CODIGO PARA QUE SIRVA TANTO PARA PERSONAS COMO PARA EVENTOS\\----\\



//funcion para obtener solo los codigos de los intereses que envia el front (no se llaman igual, por eso se tiene 2 funciones para lo mismo)
const separarCodigoInteresIngresados = (array) => {

  return array.codigo_interes;

};

//funcion para obtener solo los codigos de los intereses de a persona que estan en la base de datos (no se llaman igual, por eso se tiene 2 funciones para lo mismo)

const separarCodigoInteresConsultados = (array) => {

  return array.interes;

};


//funcion para ingresar un interes que  no se tenga en la bd
const ingresarNuevoInteres = async (codigoInteres, idorigen, origen) => {

  try {

    const codigo_interes_origen = codigoInteres + idorigen;
    const respuesta = await pool.query(`INSERT INTO interes_${origen} (codigo_interes_${origen}, ${origen}, interes) VALUES ('${codigo_interes_origen}', '${idorigen}', '${codigoInteres}')`);
    // console.log(respuesta);

  } catch (error) {

    console.log(error);
  }
};

//funcion para eliminar un interes que se tenga en la bd pero que lo desee eliminar
const EliminarInteres = async (codigoInteres, idorigen, origen) => {

  try {

    const codigo_interes_origen = codigoInteres + idorigen;
    const respuesta = await pool.query(`DELETE FROM interes_${origen} WHERE (codigo_interes_persona = '${codigo_interes_origen}')`);
    //  console.log(respuesta);


  } catch (error) {

    console.log(error);
  }
};


const compararCodigos = async (array, idorigen, origen) => {

  try {
    const respuesta = await pool.query(`SELECT interes FROM interes_${origen} WHERE (${origen} = '${idorigen}')`);
    // console.log(respuesta.rows);
    //intereses que manda el front
    const interesesIngresadosSeparados = array.map(separarCodigoInteresIngresados);
    //intereses que hay en la bd con el codigo de la persona
    const interesesConsultados = respuesta.rows;
    const interesesConsultadosSeparados = interesesConsultados.map(separarCodigoInteresConsultados);

    if (respuesta.rowCount != 0) { //si entra aqui es porque la persona ya tiene intereses registrados y toca preguntar si esta o si no esta para su eliminacion en la bd



      //console.log(array);


      console.log(interesesIngresadosSeparados);
      console.log(interesesConsultadosSeparados);

      //preguntamos a cada uno de los intereses INGRESADOS si estan en CONSULTADOS (para ingresar los que no esten aun)

      interesesIngresadosSeparados.forEach(interes => {
        const bandera = interesesConsultadosSeparados.includes(interes);
        // console.log(bandera);

        if (!bandera) { // si no esta el interes ingresado en consultados, indica que es un interes nuevo para la persona y se debe ingresar a la bd

          ingresarNuevoInteres(interes, idorigen, origen);

        } else {

          // console.log("El interes ingresado ya esta en la base de datos, por lo tanto continuamos con el siguiente");

        }

      });

      //preguntamos a cada uno de los intereses CONSULTADOS si estan en INGRESADOR (para eliminar los que no se enviaron desde el front)


      interesesConsultadosSeparados.forEach(interes => {
        const bandera = interesesIngresadosSeparados.includes(interes);
        console.log(bandera);

        if (!bandera) { // si no esta el interes consultado en INGRESADO,
          // indica que es un interes que ya no tiene la persona y debe eliminarse

          EliminarInteres(interes, idorigen, origen);

        } else {

          //console.log("El interes esta en la base de datos y en la lista de ingresados, por lo tanto no pasa nada, todos felices");

        }

      });

      const respuesta = `Se actualizaron los intereses de ${origen}`;
      console.log(respuesta);
      return respuesta;

    } else {//si entra aqui es porque no tiene intereses registrados y se insertan los que manda el front de una

      interesesIngresadosSeparados.forEach(interes => {

        ingresarNuevoInteres(interes, idorigen, origen);

      });


      const respuesta = `Se registraron los intereses de ${origen}`;
      console.log(respuesta);
      return respuesta
    }

  } catch (error) {

    console.log("----------ALGO SALIO MAL-----------");
    console.log(error);
  }

};


//FUNCION PRINCIPAL
const modificarIntereses = async (req, res) => {

  console.log("entro en modificar intereses")

  //  console.log(req.body);
  //  console.log(req.id_usuario);  

  try {

    const respuesta = await compararCodigos(req.body, req.id_usuario, 'persona');

    res.send(respuesta);

  } catch (error) {

    console.log(error);
  }
};

const modificarInteresesEvento = async (req, res) => {

  console.log("entro en modificar intereses del evento")

  //  console.log(req.body);
  //  console.log(req.id_usuario);  

  try {

    const respuesta = await compararCodigos(req.body, req.headers.eventoid, 'evento');

    res.send(respuesta);

  } catch (error) {

    console.log(error);
  }
};




module.exports = {
  getAllIntereses: getAllIntereses,
  interesesUsuario: interesesUsuario,
  modificarIntereses: modificarIntereses,
  modificarInteresesEvento: modificarInteresesEvento,
  interesesEvento: interesesEvento
};