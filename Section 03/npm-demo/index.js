// Al importar un modulo con la palabra require, node lo busca en tres lugares
//    1. Core module: busca si es un modulo propio de node
//    2. File or folder: busca si es un modulo que creamos nosotros en el proyecto
//    3. Node Modules: busca si es una libreria instalada a traves de npm

// Importar libreria Underscore
const _ = require("underscore");

const result = _.contains([1, 2, 3], 2);
console.log(result);

const lib = require("npm-lib-genzop");
const result2 = lib.add(2, 3);
console.log(result2);
