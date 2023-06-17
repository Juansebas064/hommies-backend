const { pool } = require('../api/db.js');


  const getAllIntereses = async (req,res) => {

    try {
      const respuesta = await pool.query(`SELECT * FROM interes`);
     
      res.send(respuesta.rows);
     
    } catch (error) {
     
      console.log(error);
    }
  };

  const interesesUsuario = async (req, res) =>{
    
    try {
        const query = 'select i.* from interes i inner join interes_persona ip on i.codigo_interes = ip.interes where ip.persona  = $1;'
        const intereses = await pool.query(query, [req.id_usuario]);

        if(!intereses){
            res.status(204).json({mensaje: 'El usuario no tiene intereses'});
        }

        res.status(200).json(intereses);
    } catch (error) {
        
    }
  }


module.exports = {
    getAllIntereses: getAllIntereses,
    interesesUsuario: interesesUsuario
};