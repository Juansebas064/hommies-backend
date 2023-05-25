const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const GetActividadData = require("./api/db");


app.use(cors(
  { origin: true, credentials: true }));

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});


app.get('/asd', (req, res) => {
  res.send('¡Hola desde el backend para mister Jordi!');
});


//get para hacer las request de las bases de datos
app.get('/data', async (req, res) => {

  const respuesta = await GetActividadData();
  res.send(respuesta);
});

// Muchachos del backend, podrían hacerme una (inserte nombre correcto aquí)
// para poder obtener la ip de la máquina en la -red y poderla mandar al front?
// De antemano muchas gracias