// Importar modulo para trabajar con archivos
const fs = require("fs");

// Leer todos los archivos de un directorio de manera sincrona
const files = fs.readdirSync("./");
console.log(files);

// Leer todos los archivos de un directorio de manera asincrona
fs.readdir("./", {}, function (error, files) {
  if (error) {
    console.log("Error", error);
    return;
  }

  console.log("Result", files);
});
