const apiMessage = require('./api/utils');

const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");


app.use(cors(
  {origin: true, credentials: true}));

app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send('¡Hola desde el backend para mister Jordi!');
  });


app.get('/api/jordiMessage', (req, res) => {
  res.send(apiMessage);
})