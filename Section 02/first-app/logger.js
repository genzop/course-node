const url = "http://mylogger.io/log";

function log(message) {
  // Enviar request HTTP
  console.log(message);
}

// Modulos
// Para definir un modulo se exporta uno o mas miembros del modulo como parte del objeto 'module.exports'.
// module.exports.log = log;

// Tambien es posible exportar directamente un miembro
module.exports = log;
