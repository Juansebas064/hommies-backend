//archivo que contiene los modulos para las peticiones a la base de datos

const res = require("express/lib/response");
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
=======
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('yxhicvui', 'yxhicvui', 'nWBzu5sNC2xI0SOFVxXjeT1k6ZYLm1Jl', {
  host: 'mahmud.db.elephantsql.com',
  dialect: 'postgres'
})
>>>>>>> 11c6dfcce1ff67ce8dbc324299c4ae6e39502267

const { Pool } = require("pg");
const config = {
  user: "yxhicvui",
  host: "mahmud.db.elephantsql.com",
  password: "nWBzu5sNC2xI0SOFVxXjeT1k6ZYLm1Jl",
  database: "yxhicvui",
};

const pool = new Pool(config);

const getEventoData = async () => {
  try {
    const respuesta = await pool.query("SELECT * FROM evento;");
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

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
              ingresoCorrecto:false

            });
        }

    
        // Verificar si la contraseña coincide
        if (rows[0].contraseña !== password) {
          return ({
            ingresoCorrecto:false

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
    id, nickname, nombre, apellido, foto, correo_electronico)
    VALUES ('${req.id}','${req.nickname}','${req.firstName}', '${req.lastName}', '${req.picture}', '${req.email}');`);

    const datosToken = {

      id: req.id
    }
    const token = jwt.sign(datosToken, "ruizgei");
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




const registrarPersonaNormal = async (req, res) => {



  //como sabemos que no esta registrado, toca generar un nuevo id para la persona

   const id = generarIdentificadorUnico();
  

  console.log(req);
  console.log(id);

  const respuesta = await pool.query(`INSERT INTO persona(
    id, nickname, nombre, apellido, "contraseña", correo_electronico)
    VALUES ('${id}','${req.nickname}','${req.nombre}', '${req.apellido}', '${req.password}', '${req.email}');`);


    const datosToken = {

      id:id

    }

  const token = jwt.sign(datosToken, "ruizgei");
  console.log(respuesta);




  return token;
};


module.exports = validarSesion;

module.exports = {
  pool: pool,
  getEventoData: getEventoData,
  validarSesion: validarSesion,
<<<<<<< HEAD
  registrarPersonaGoogle: registrarPersonaGoogle,
  registrarPersonaNormal:registrarPersonaNormal
=======
  sequelize: sequelize
>>>>>>> 11c6dfcce1ff67ce8dbc324299c4ae6e39502267
}
