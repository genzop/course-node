// Importar la clase EventEmitter
const EventEmitter = require("events");

// Crear una clase que hereda de EventEmitter.
// Esto permite esta clase comparta toda la funcionalidad que un EventEmitter
// Y asi los demas modulos trabajen con el Logger, utilizaran siempre la misma instancia del EventEmitter.
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://www.google.com/" });
  }
}

module.exports = Logger;
