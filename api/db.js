//archivo que contiene los modulos para las peticiones a la base de datos

const res = require("express/lib/response");

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

module.exports = {
  pool: pool,
  getEventoData: getEventoData
}
