const bycript = require("bcrypt");
const jwt = require('jsonwebtoken');
const { validarSesion } = require('../api/db.js');


const jwtGenerator = async (req, res) => {

  const user = await validarSesion(req);

  if (user.ingresoCorrecto != true) {

    res.send({
      token: null
    });

  } else {

    const token = jwt.sign({ id: user.id }, "ds1g3");

    res.send({
      token: token
    });
  }
};


module.exports = jwtGenerator;