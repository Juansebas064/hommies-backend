//archivo que contiene los modulos para las peticiones a la base de datos

const res = require("express/lib/response");

const jwt = require('jsonwebtoken');

const by = require('bcrypt');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('hommies', 'e_202059898', '202059898', {
  host: '45.5.167.45',
  dialect: 'postgres',
  define: {
    freezeTableName: true
  }
});

const { Pool } = require("pg");
const config = {
  user: "e_202059898",
  password: "202059898",
  pgsql: 'localhost',
  database: 'hommies',
  host: "45.5.167.45",
  port: 5432,
  schema: "public"
};

const pool = new Pool(config);

//FALTA LOGICA PARA REGISTRO, NO TOCAR FRONT'S :))))))))))
const validarSesion = async (req, res) => {
  const nickname = req.body.nickname;
  const password = req.body.password;
  try {

    console.log(nickname);
    //   console.log(req)

    // Consulta a la base de datos para obtener el usuario con el nickname proporcionado
    const query = `
          SELECT * FROM persona
          WHERE nickname = $1
          LIMIT 1
        `;
    const { rows } = await pool.query(query, [nickname]);

    if (rows.length == 0) {
      // return res.status(404).json({ error: 'El nickname no está registrado', isLogged: false });
      console.log("ENTRA AQUI");

      return ({
        ingresoCorrecto: false

      });
    }


    //metodo de bycript para comparar sin necesitad de encriptar
    // Verificar si la contraseña coincide
    if (!await by.compare(password, rows[0].contraseña)) {
      return ({
        ingresoCorrecto: false

      });
    }

    const usuario = {
      ingresoCorrecto: true,
      "id": rows[0].id
    }

    // El inicio de sesión fue exitoso
    return usuario;

  } catch (error) {

    console.error('Error al realizar el inicio de sesión:', error);
    // res.status(500).json({ error: 'Error del servidor' });
  }
};


const registrarPersonaGoogle = async (req, res) => {

  console.log(req);

  const respuesta = await pool.query(`INSERT INTO persona(
    id, tipo_de_usuario, nickname, nombre, apellido, foto, correo_electronico)
    VALUES ('${req.id}', 'Google','${req.nickname}','${req.firstName}', '${req.lastName}', '${req.picture}', '${req.email}');`);

  const datosToken = {

    id: req.id
  }
  const token = jwt.sign(datosToken, "ds1g3");
  console.log(respuesta);




  return token;
};



const generarIdentificadorUnico = () => {
  const fechaActual = new Date();
  const anio = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();
  const milisegundos = fechaActual.getMilliseconds();

  const identificador = `${anio}${mes}${dia}${hora}${minutos}${segundos}${milisegundos}`;

  return identificador;
}

const uuidEventoParticipa = () => {
  const fechaActual = new Date();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();

  const identificador = `${mes}${dia}${hora}${minutos}`;

  return identificador;
}


const encriptarPass = async (password) => {

  const salt = await by.genSalt();
  const encript = await by.hash(password, salt);



  return encript;
}



const registrarPersonaNormal = async (req, res) => {



  //como sabemos que no esta registrado, toca generar un nuevo id para la persona

  const id = generarIdentificadorUnico();


  //encriptamos la contraseña
  const password = await encriptarPass(req.password);

  console.log("CONTRA ENCRIPTAASDASD");
  console.log(password);



  console.log(req);
  console.log(id);

  const ojalaSirva = {

    id: id,
    req

  }

  console.log(ojalaSirva);




  const respuesta = await pool.query(`INSERT INTO persona(
    id, tipo_de_usuario, nickname, nombre, apellido, "contraseña", correo_electronico)
    VALUES ('${id}', 'Normal','${req.nickname}','${req.nombre}', '${req.apellido}', '${password}', '${req.email}');`);


  const datosToken = {

    id: id

  }

  const token = jwt.sign(datosToken, "ds1g3");
  console.log(respuesta);




  return token;
};



const verificarCorreoExistente = async (correo) =>{
  try {
    const query = 'SELECT * FROM public.persona WHERE correo_electronico = $1'; 

    const result = await pool.query(query, [correo]);

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error al verificar el correo en la base de datos', error);
    throw error;
  }
}


//module.exports = validarSesion;

module.exports = {
  pool: pool,
  validarSesion: validarSesion,
  registrarPersonaGoogle: registrarPersonaGoogle,
  registrarPersonaNormal: registrarPersonaNormal,
  sequelize: sequelize,
  generarIdentificadorUnico: generarIdentificadorUnico,
  uuidEventoParticipa: uuidEventoParticipa,
  verificarCorreoExistente: verificarCorreoExistente
}
