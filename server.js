

const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const { join, dirname } = require('path');
//const url = require('meta');

const { routerAgregarEvento, routerEditarEvento, routerObtenerEventosC, routerAnularInscripcionEvento, routerEliminar, routerInscripcionEvento, routerObtenerParticipantes, routerObtenerListaEventos, routerEventosParaNavBar } = require('./routes/rutasEvento');
const userDataRouter = require('./routes/userDataRouter');
const verifyGoogleLogin = require('./routes/rutasModuloLogin');
const jwtCreate = require('./routes/sessionRoute');
const verifyGoogleRegister = require('./routes/rutasModuloRegistroGoogle');
const normalRegister = require('./routes/turaModuloRegistroNormal');
const routerModificarPerfil = require('./routes/rutasModificarPerfil');
const { routerGetPlace, routerAgregarLugar, routerEliminarLugar, routerListarLugares } = require('./routes/rutasLugar');
const { routerModificarInteres, routerGetIntereses, routerInteresesUsuario, routerInteresesEvento, routerGetInteresesEvento } = require('./routes/rutasIntereses');
const routerRecoverPass = require('./routes/recoverPassword');
const { routerGetCiudad } = require('./routes/rutasCiudad');



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

//use para eñiminar un evento
app.use('/api', routerEliminar);

//
app.use('/api', routerInscripcionEvento);

app.use('/api', routerObtenerParticipantes);

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

//use para eliminar logicamente un lugar (inactivarlo)
app.use('/api', routerEliminarLugar);

//use para modificar el perfil

app.use('/api', routerModificarPerfil);

app.use('/api', routerGetPlace);

app.use('/api',routerListarLugares);

//use para modificar y registrar los intereses de la persona
app.use('/api', routerModificarInteres);

//use para obtener todos los intereses de la base de datos
app.use('/api', routerGetIntereses);

//use para obtener todos los intereses del usuario
app.use('/api', routerInteresesUsuario);

//use para registrar los intereses de un evento
app.use('/api', routerInteresesEvento);

// use para obtener todos los intereses de un evento
app.use('/api', routerGetInteresesEvento)

//use para obtener todos los eventos de un lugar
app.use('/api', routerObtenerListaEventos);

//use para recuperar contraseña
app.use('/api', routerRecoverPass);

//use para obtener ciudad del usuario
app.use('/api', routerGetCiudad)




//incio pruebas para mandar fotos al front
//NOTA: NO BORRRAR NI REFACTORIZAR
//Ya se intento y no sirve jsjs
const current = dirname(require.main.filename);
console.log(current);

app.use('/api/img', express.static(join(current, 'api/img')));
//fin pruebas para mandar fotos al front



//use para tener todos los eventos de la navBar
app.use ('/api', routerEventosParaNavBar);



app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
