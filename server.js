const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");

const { getEventoData } = require("./api/db");
const { routerAgregarEvento, routerEditarEvento } = require('./routes/addEventRoute');
const userDataRouter = require('./routes/userDataRouter');
const verifyGoogleLogin = require('./routes/rutasModuloLogin');
const jwtCreate = require('./routes/sessionRoute');
const verifyGoogleRegister = require('./routes/rutasModuloRegistroGoogle');
const normalRegister = require('./routes/turaModuloRegistroNormal');
const routerAgregarLugar = require('./routes/addPlaceRoute');
const routerEliminarEvento = require('./routes/rutasEliminarEvento');

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


//use para crear y verificar el jwt con el boton de INICIO NORMAL

app.use('/api', jwtCreate);


//use para registrar una persona en la base de datos con google

app.use('/api', verifyGoogleRegister);


//use para registrar una persona de forma normal

app.use('/api', normalRegister);

// use para obtener los datos del usuario al momento de hacer login

app.use('/api', userDataRouter); /* /api/persona/consultar */

//use para agregar lugar

app.use('/api', routerAgregarLugar);

app.use('/api', routerEliminarEvento);


app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
