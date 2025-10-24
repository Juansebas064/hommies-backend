import { pool, registrarPersonaNormal } from '../config/db.js';


const verificarIDBd = async (jsonPersona) => {

  try {
    const respuesta = await pool.query(`SELECT * FROM persona WHERE (correo_electronico ='${jsonPersona.email}' OR nickname = '${jsonPersona.nickname}')`);

    return respuesta;

  } catch (error) {
    console.log(error);
  }
};


const normalRegister = async (req, res) => {

  //esto solo verifica que no este en la base de datos
  const VerificarBD = await verificarIDBd(req.body.data);

  //si entra aqui no esta en la base de datos
  if (VerificarBD.rowCount == 0) {

    const registroExitoso = await registrarPersonaNormal(req.body.data);

    console.log("YA SE REGISTRO LA PERSONA");

    res.send({
      token: registroExitoso
    });

  } else {
    //si esta aqui es porque ya esta en la base de datos

    console.log("EL USUARIO YA ESTA EN LA BASE DE DATOS");

    res.send({
      token: null
    });
  }
};


export default normalRegister;