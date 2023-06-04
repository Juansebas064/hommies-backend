const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");

const {getEventoData} = require("./api/db");
const addEventRouter = require('./routes/addEventRoute')
const routerLogin = require('./routes/loginRoute');
const verifyGoogleLogin = require('./routes/rutasModuloLogin');
const jwtCreate = require('./routes/sessionRoute');
const verifyGoogleRegister = require('./routes/rutasModuloRegistroGoogle');
const normalRegister = require('./routes/turaModuloRegistroNormal');

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
app.use('/api', addEventRouter);


//use para crear y verificar el jwt con el boton de GOOGLE
app.use('/api', verifyGoogleLogin);


//use para crear y verificar el jwt con el boton de INICIO NORMAL

app.use('/api', jwtCreate);


//use para registrar una persona en la base de datos con google

app.use('/api',verifyGoogleRegister);


//use para registrar una persona de forma normal

app.use('/api',normalRegister)






app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
