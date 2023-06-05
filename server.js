const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");

const {getEventoData} = require("./api/db");
const {routerAgregarEvento, routerEditarEvento} = require('./routes/addEventRoute')
const routerLogin = require('./routes/loginRoute');
const verifyGoogleLogin = require('./routes/rutasModuloLogin');

app.use(cors(
  { origin: true, credentials: true }));

app.use(express.json());

app.get('/asd', (req, res) => {
  res.send('¡Hola desde el backend para los que iniciaron sesion, pero no para jordi :)');
});

//get para hacer las request de las bases de datos
app.get('/api/evento/consultar', async (req, res) => {
  const respuesta = await getEventoData();
  res.send(respuesta);
});


//use para añadir un evento
app.use('/api', routerAgregarEvento);

//use para editar eventos creados
app.use('/api', routerEditarEvento);


//use para crear y verificar el jwt con el boton de GOOGLE
app.use('/api', verifyGoogleLogin);

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
