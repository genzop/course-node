// Importar modulo que permite trabajar con paths
const path = require("node:path");

// Procesa un path de un string y devuelve un objeto
const pathObj = path.parse(__filename);

console.log(pathObj);
