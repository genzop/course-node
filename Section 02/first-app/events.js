// Importar clase que nos permite trabajar con eventos
const EventEmitter = require("events");

// Crear una instancia de un EventEmitter. Esta instancia debe ser la misma cuando se trabaja con el mismo tipo de evento
const emitter = new EventEmitter();

// Registra un listener para todos los eventos 'messageLogged'
emitter.on("messageLogged", (e) => {
  console.log("Listener called", e);
});

// Emite un evento 'messageLogged' con un objeto como parametro
// emitter.emit("messageLogged", { id: 1, url: "http://www.google.com/" });

emitter.on("messageLogging", (e) => {
  console.log("Logging", e);
});

// emitter.emit("messageLogging", "Helo World!");
