const winston = require('winston');

// Middleware para el manejo de errores inesperados
module.exports = function (err, req, res, next) {
  // Niveles de loggeo
  //    1. Error
  //    2. Warn
  //    3. Info
  //    4. Verbose
  //    5. Debug
  //    6. Silly

  winston.error(err.message, err);
  res.status(500).send('Something failed.');
};
