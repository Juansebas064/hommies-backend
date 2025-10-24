import bycript from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { validarSesion } from '../config/db.js';


const JWTController = async (req, res) => {

  const user = await validarSesion(req);

  if (user.ingresoCorrecto != true) {

    res.send({
      token: null
    });

  } else {

    const token = sign({ id: user.id }, "ds1g3");

    res.send({
      token: token
    });
  }
};


export default JWTController;