const {pool} = require('../api/db.js');
const {verifyGoogleCredential} = require('../api/AuthGoogle');



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

    console.log("entra aqui");
  
    console.log("VERIFICACION DE LA CREDENCIAL");
  
    console.log(req.body.data);

    const result = await verifyGoogleCredential(req.body.data.credential);
  
    console.log(result);
    console.log(result.userId);
    console.log(typeof result.userId);
  
    //ya no se utiliza mas esto porque ya estoy en la base de datos
    //const insertarBitzkort = await pruebaBitz(result.userId);
  
    const VerificarBD = await verificarIDBd(result.userId);
  
    console.log(VerificarBD);
  
    const bandera = true;
  
    if (VerificarBD.rowCount == 0) {
  
      console.log(VerificarBD.rowCount + " asdfghgfdsdsfgdsdfg");
  
      res.send(!bandera);
  
    } else {
  
      res.send(bandera);
  
    }
  
  };


  module.exports = 
    verifyGoogleLogin

   