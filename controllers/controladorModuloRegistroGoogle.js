import { pool, registrarPersonaGoogle } from '../config/db.js';
import { verifyGoogleCredential } from '../api/AuthGoogle.js';
import jwt from 'jsonwebtoken';


const verificarIDBd = async (idcliente) => {

  try {
    const respuesta = await pool.query(`SELECT * FROM persona WHERE (id ='${idcliente}')`);

    return respuesta;

  } catch (error) {
    console.log(error);
  }
};
//funcion para verificar el login GOOGLE
const verifyGoogleRegister = async (req, res) => {

  //esto solo tiene el id
  const result = await verifyGoogleCredential(req.body.data.credential);

  //esto solo verifica que no este en la base de datos
  const VerificarBD = await verificarIDBd(result.id);

  //si entra aqui no esta en la base de datos
  if (VerificarBD.rowCount == 0) {

    const registroExitoso = await registrarPersonaGoogle(result);

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


export default verifyGoogleRegister;