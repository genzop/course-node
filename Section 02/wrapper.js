// Module Wrapper Function
// Todos los modulos se encuentran envueltos en una funcion como la siguiente.
// Es una funcion autoejecutable que nos da acceso a las siguientes variables
(function (exports, require, module, __filename, __dirname) {
  const url = "http://mylogger.io/log";

  function log(message) {
    console.log(message);
  }

  module.exports = log;
});
