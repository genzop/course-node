// Importar framework Express
const express = require('express');

// Crear servidor
const app = express();

// Configurar ruta de tipo GET
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

// Configurar ruta con parametros por ruta
app.get('/api/courses/:id', (req, res) => {
  res.send(req.params);
});

// Configurar ruta con parametros por query
app.get('/api/courses/:year/:month', (req, res) => {
  res.send(req.query);
});

// Obtener puerto desde de las variables de entorno
// Para setear una variable de entorno en una consola de Powershell, se utiliza el siguiente comando: $env:PORT=5000
const port = process.env.PORT || 3000;

// Inicializar servidor
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
