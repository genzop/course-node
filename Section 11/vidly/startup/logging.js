// Importar libreria para loggeo
const winston = require('winston');
// Importar libreria para loggeo a MongoDb
require('winston-mongodb');
// Importar libreria para intercepcion de errores.
// Se aplica a todas las rutas automaticamente.
// Cuando ocurre un error, ejecuta el metodo next() automaticamente
// para que los errores sean manejados por un middleware.
require('express-async-errors');

module.exports = function () {
  // Configurar donde se van a guardar los logs
  winston.add(
    new winston.transports.Console({ colorize: true, prettyPring: true })
  );
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://127.0.0.1/vidly',
      level: 'error',
    })
  );

  // Handler para interceptar excepciones que ocurran fuera de un route
  // process.on('uncaughtException', (ex) => {
  //   console.log('WE GOT AN UNCAUGHT EXCEPTION');
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // Winston handler para interceptar excepciones que ocurran fuera de un route
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPring: true }),
    new winston.transports.File({ filename: 'unhandledExceptions.log' })
  );

  // Handler para interceptar promises que sean rechazadas fuera de un route
  process.on('unhandledRejection', (ex) => {
    // Lanza una excepcion para que sea interceptada por el metodo para uncaught exceptions.
    throw ex;
  });
};
