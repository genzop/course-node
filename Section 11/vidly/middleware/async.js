// Middleware para atajar errores de manera generica
module.exports = function asyncMiddleware(handler) {
  // Retornar referencia a una funcion
  return async (req, res, next) => {
    try {
      // Ejecutar handler
      await handler(req, res);
    } catch (error) {
      // Enviar error al middleware de manejo de errores
      next(error);
    }
  };
};
