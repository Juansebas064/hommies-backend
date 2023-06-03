//archivo que contiene los modulos para las peticiones a la base de datos

const res = require("express/lib/response");
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('yxhicvui', 'yxhicvui', 'nWBzu5sNC2xI0SOFVxXjeT1k6ZYLm1Jl', {
  host: 'mahmud.db.elephantsql.com',
  dialect: 'postgres'
})

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
              isLoged:false,
              token:null

            });
        }

    
        // Verificar si la contraseña coincide
        if (rows[0].contraseña !== password) {
          return ({
            isLoged:false,
            token:null

          });
        }

        const usuario = {
            "isLogged": true,
            "id": rows[0].id,
            "tipo_de_usuario": rows[0].tipo_de_usuario,
            "nickname": rows[0].nickname,
            "nombre": rows[0].nombre,
            "apellido": rows[0].apellido,
            "genero": rows[0].genero,
            "foto": rows[0].foto,
            "correo_electronico": rows[0].correo_electronico,
            "fecha_nacimiento": rows[0].fecha_nacimiento,
            "descripcion": rows[0].descripcion,
            "likes": rows[0].likes,
            "ciudad": rows[0].ciudad
        }
    
        // El inicio de sesión fue exitoso
       return usuario;

      } catch (error) {
        
        console.error('Error al realizar el inicio de sesión:', error);
       // res.status(500).json({ error: 'Error del servidor' });
      }
};

module.exports = validarSesion;

module.exports = {
  pool: pool,
  getEventoData: getEventoData,
  validarSesion: validarSesion,
  sequelize: sequelize
}
