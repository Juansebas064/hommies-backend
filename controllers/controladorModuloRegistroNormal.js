const {pool, registrarPersonaNormal} = require('../api/db.js');


const verificarIDBd = async (jsonPersona) => {

    try {
      const respuesta = await pool.query(`SELECT * FROM persona WHERE (correo_electronico ='${jsonPersona.email}' OR nickname = '${jsonPersona.nickname}')`);
     
     
      return respuesta;
     
    } catch (error) {
     
      console.log(error);
    }
  };

const normalRegister = async (req, res) => {

    console.log("entra a registro de persona normal");
  
    console.log(req.body.data);


    //esto solo verifica que no este en la base de datos
    const VerificarBD = await verificarIDBd(req.body.data);
  
   // console.log(VerificarBD);
   console.log(VerificarBD.rows);
    //const bandera = true;
  

    //si entra aqui no esta en la base de datos
    if (VerificarBD.rowCount == 0) {
  
      console.log(VerificarBD.rowCount + " asdfghgfdsdsfgdsdfg");


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


module.exports = normalRegister;