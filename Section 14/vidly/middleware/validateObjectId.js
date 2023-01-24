const mongoose = require('mongoose');

// Middleware para validar que el formato de los Id corresponda a un ObjectId de MongoDb
module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID.');
  }

  next();
};
