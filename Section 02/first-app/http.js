// Importar modulo que permite trabajar con un servidor HTTP
const http = require("node:http");

// Crear instancia de un servidor con una funcion que procesa todos los request
const server = http.createServer((req, res) => {
  // Validar si es la url base
  if (req.url === "/") {
    // Escribir una respuesta plana
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// Agregar listener para cada vez que alguien se conecta al servidor
server.on("connection", (socket) => {
  console.log("New connection...");
});

// Iniciar servidor en el puerto 3000
server.listen(3000);

console.log("Listening on port 3000...");
