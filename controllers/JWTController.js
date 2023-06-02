const bycript = require("bcrypt");
const jwt = require('jsonwebtoken');

const {validarSesion} = require('../api/db.js');

const jwtGenerator = async (req, res) => {
  

  const user = await validarSesion(req);

  console.log(user);
  if(user.isLoged == false) {

      res.send({
        
        isLoged:false,
        token: null
      });
  } else {


    const token = jwt.sign(user, "ruizgei");

    res.send({
        isLoged: true,
      token: token
    });
    console.log(user);
  }

};


module.exports = jwtGenerator;
