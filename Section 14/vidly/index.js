const express = require('express');
const winston = require('winston');

const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;

// Guardar instancia de servidor de la aplicacion
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

// Exportar instancia del servidor para poder utilizarlo en test de integracion
module.exports = server;
