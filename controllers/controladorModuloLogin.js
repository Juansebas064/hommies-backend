const { pool } = require('../api/db.js');
const { verifyGoogleCredential } = require('../api/AuthGoogle');
const jwt = require('jsonwebtoken');


const verificarIDBd = async (idcliente) => {



  try {
    const respuesta = await pool.query(`SELECT * FROM persona WHERE (id ='${idcliente}')`);

    console.log('VerificarIDBd: ' + idcliente)
    return respuesta;

  } catch (error) {

    console.log(error);
  }
};

//funcion para verificar el login GOOGLE
const verifyGoogleLogin = async (req, res) => {

  console.log("entra aqui");

  console.log("VERIFICACION DE LA CREDENCIAL");

  console.log(req.body.data);

  const result = await verifyGoogleCredential(req.body.data.credential);

  // console.log(result);
  // console.log(result.id);
  // console.log(result.email);
  // console.log(typeof result.id);


  const VerificarBD = await verificarIDBd(result.id);

  // console.log(VerificarBD);
  console.log(VerificarBD.rows);
  //const bandera = true;

  if (VerificarBD.rowCount == 0) {

    // console.log(VerificarBD.rowCount + " asdfghgfdsdsfgdsdfg");


    //se setea que no esta registrado




    res.send({
      token: null
    });


  } else {

    // console.log("----------------------------------");

    const json = VerificarBD.rows[0].id;

    // console.log('json antes de: ' + json)

    const token = jwt.sign(json, "ds1g3");
    // console.log('Id guardada en el token: ' + json)
    // console.log('Token enviado: ' + token)

    res.send({
      token: token
    });

  }

};


module.exports =
  verifyGoogleLogin

