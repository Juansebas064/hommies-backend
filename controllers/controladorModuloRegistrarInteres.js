const { pool } = require('../api/db.js');


  const registrarIntereses = async (req,res) => {

    console.log("llego hasta aqui")

    console.log(req.body);

    try {
      const respuesta = await pool.query(`SELECT * FROM interes`);
      console.log("logra ejecutar?");
     
      res.send(respuesta.rows);
     
    } catch (error) {
     
      console.log(error);
    }
  };









module.exports = registrarIntereses;
