const express = require('express');
const app = express();
const port = 5000;


app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
  });


  