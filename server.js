const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const { GetActividadData } = require("./api/db");
const { agregarEvento } = require('./controllers/addEvent')

app.use(cors(
  { origin: true, credentials: true }));

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});

app.use(express.json());

app.get('/asd', (req, res) => {
  res.send('¡Hola desde el backend para mister Jordi!');
});

//get para hacer las request de las bases de datos
app.get('/data', async (req, res) => {
  const respuesta = await GetActividadData();
  res.send(respuesta);
});

app.post('/api', (req, res) => {
  agregarEvento;
});
