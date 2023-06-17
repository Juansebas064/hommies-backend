const { pool } = require('../api/db.js');


  const getAllIntereses = async (req,res) => {

    try {
      const respuesta = await pool.query(`SELECT * FROM interes`);
     
      res.send(respuesta.rows);
     
    } catch (error) {
     
      console.log(error);
    }
  };


module.exports = getAllIntereses;
