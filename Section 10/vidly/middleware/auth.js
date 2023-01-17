const config = require('config');
const jwt = require('jsonwebtoken');

// Crear middleware de autenticacion
module.exports = function (req, res, next) {
  // Obtener token de los headers
  const token = req.header('x-auth-token');

  // Si no existe, enviar un error 401
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // Validar JWT
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

    // Setear user para todos los requests
    req.user = decoded;

    next();
  } catch (error) {
    // Si no es valido, enviar error 400
    return res.status(400).send('Invalid token.');
  }
};
