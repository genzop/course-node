// Importar clase personalizada que hereda de EventEmitter
const Logger = require("./logger");
// Crear una instancia de esa clase
const logger = new Logger();

// Agregar un listener para el evento 'messageLogged'
logger.on("messageLogged", (e) => {
  console.log("Listener called", e);
});

// Loguear un mensaje
logger.log("Hello World!");
