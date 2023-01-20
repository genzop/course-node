const express = require('express');
const winston = require('winston');

const app = express();

// Configurar rutas
require('./startup/routes')(app);

// Configurar database
require('./startup/db')();

// Configurar loggeo
require('./startup/logging')();

// Configuracion general
require('./startup/config')();

// Configuracion validaciones
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
