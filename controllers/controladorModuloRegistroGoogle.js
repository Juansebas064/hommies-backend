const {pool, registrarPersonaGoogle} = require('../api/db.js');
const {verifyGoogleCredential} = require('../api/AuthGoogle');
const jwt = require('jsonwebtoken');

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

    console.log("entra aqui al registro con google");
  
    console.log("VERIFICACION DE LA CREDENCIAL");
  
    console.log(req.body.data);


    //esto solo tiene el id
    const result = await verifyGoogleCredential(req.body.data.credential);
  
    console.log(result);
    console.log(result.id);
    console.log(result.email);
    console.log(typeof result.id);

    //esto solo verifica que no este en la base de datos
    const VerificarBD = await verificarIDBd(result.id);
  
   // console.log(VerificarBD);
   console.log(VerificarBD.rows);
    //const bandera = true;
  

    //si entra aqui no esta en la base de datos
    if (VerificarBD.rowCount == 0) {
  
      console.log(VerificarBD.rowCount + " asdfghgfdsdsfgdsdfg");


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

module.exports = verifyGoogleRegister;