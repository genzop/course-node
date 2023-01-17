const mongoose = require('mongoose');

// Crear ObjectId bajo demanda
const id = new mongoose.Types.ObjectId();
console.log(id);

// Los ObjectId estan compuesto por 12 bytes que contienen varios datos
//    - 4 bytes: timestamp de creacion
//    - 3 bytes: identificador de la computadora
//    - 2 bytes: identificador del proceso
//    - 3 bytes: contador

// Obtener timestamp
console.log(id.getTimestamp());

// Validar ObjectId
const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);
