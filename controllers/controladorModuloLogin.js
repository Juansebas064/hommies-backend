import { pool } from '../config/db.js';
import { verifyGoogleCredential } from '../api/AuthGoogle';
import { sign } from 'jsonwebtoken';


const verificarIDBd = async (idcliente) => {

  try {
    const respuesta = await pool.query(`SELECT * FROM persona WHERE (id ='${idcliente}')`);

    return respuesta;

  } catch (error) {
    console.log(error);
  }
};

//funcion para verificar el login GOOGLE
const verifyGoogleLogin = async (req, res) => {

  const result = await verifyGoogleCredential(req.body.data.credential);
  const VerificarBD = await verificarIDBd(result.id);

  if (VerificarBD.rowCount == 0) {

    res.send({
      token: null
    });

  } else {

    const id = VerificarBD.rows[0].id;
    const token = sign({ id }, "ds1g3");

    res.send({
      token: token
    });
  }
};


export default
  verifyGoogleLogin

