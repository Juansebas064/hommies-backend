const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");

const { routerAgregarEvento, routerEditarEvento, routerObtenerEventosC, routerAnularInscripcionEvento } = require('./routes/rutasEvento');
const userDataRouter = require('./routes/userDataRouter');
const verifyGoogleLogin = require('./routes/rutasModuloLogin');
const jwtCreate = require('./routes/sessionRoute');
const verifyGoogleRegister = require('./routes/rutasModuloRegistroGoogle');
const normalRegister = require('./routes/turaModuloRegistroNormal');
const routerAgregarLugar = require('./routes/addPlaceRoute');
const routerEliminarEvento = require('./routes/rutasEliminarEvento');
const routerModificarPerfil = require('./routes/rutasModificarPerfil');
const routerGetPlace = require('./routes/rutasLugar')
const routerRegistrarIntereses = require('./routes/rutasIntereses');
const routerGetAllIntereses = require('./routes/rutasGetAllIntereses');


app.use(cors(
  { origin: true, credentials: true }));

app.use(express.json());

app.get('/asd', (req, res) => {
  res.send('¡Hola desde el backend para los que iniciaron sesion, pero no para jordi :)');
});

//use para añadir un evento
app.use('/api', routerAgregarEvento);

//use para editar eventos creados
app.use('/api', routerEditarEvento);

//use para consultar eventos de la misma ciudad en la que vive el usuario loggeado
app.use('/api', routerObtenerEventosC);

//use para anular inscripciones de el usuario a un evento
app.use('/api', routerAnularInscripcionEvento);

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

app.use('/api', routerModificarPerfil);

app.use('/api', routerGetPlace);

app.use('/api', routerGetAllIntereses);

app.use('/api', routerRegistrarIntereses);


app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
