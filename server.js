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

app.use(cors(
  { origin: true, credentials: true }));

app.use(express.json());

app.get('/asd', (req, res) => {
  res.send('¡Hola desde el backend para mister Jordi!');
});

//get para hacer las request de las bases de datos
app.get('/api/evento/consultar', async (req, res) => {
  const respuesta = await getEventoData();
  res.send(respuesta);
});

app.use('/api', addEventRouter);


//CAMBIO ESTO POR EL JWTCONTROLLER
//app.use('/login', routerLogin);



//use para crear y verificar el jwt con el boton de GOOGLE
app.use('/api', verifyGoogleLogin);


//use para crear y verificar el jwt con el boton de INICIO NORMAL

app.use('/api', jwtCreate);


app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
