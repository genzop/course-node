// Importar modulo para trabajar con el Sistema Operativo
const os = require("node:os");

// Obtener el total de memoria ram
var totalMemory = os.totalmem();
// Obtener solo la memoria ram disponible
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
