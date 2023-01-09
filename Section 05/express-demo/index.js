const express = require('express');
const config = require('config');
// Importar paquete para debuggear codigo bajo un namespace en particular, en este caso 'startup'
// Para que esto funcione, es necesario configurar una variable de entorno con el namespace que queramos ver. Ej: $env:DEBUG='app:startup'
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const log = require('./middleware/logger');

const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

// Configurar PUG como el view engine del servidor
app.set('view engine', 'pug');
// Configurar donde se van a almacenar las vistas
app.set('views', './pages');

// Obtener el entorno actual desde una variable de entorno, puede no estar definida
const nodeEnv = process.env.NODE_ENV;
// Obtener el entorno actual desde el servidor de express, es 'development' por defecto
const appEnv = app.get('env');

// Acceder a variables parametrizables utilizando el paquete 'config'
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// Configurar middleware que parsea el body del request como JSON
app.use(express.json());

// Configurar middleware que parsea parametros UrlEncoded como si fueran el body del request
app.use(express.urlencoded({ extended: true }));

// Configurar middleware que permite acceso a archivos estaticos dentro del directorio especificado
app.use(express.static('public'));

// Configurar middleware que mejora la seguridad agregando multiples headers HTTP
app.use(helmet());

if (appEnv === 'development') {
  // Configurar middleware que loggea todos los request
  app.use(morgan('tiny'));
  // Loggear mensaje utilizando el paquete 'debug' con el namespace 'startup'
  startupDebugger('Morgan enabled...');
}

// Loggear mensaje utilizando el paquete 'debug' con el namespace 'startup
dbDebugger('Connected to the database...');

// Configurar como middleware una funcion de un modulo externo
app.use(log);

// Configurar como middleware una funcion
app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

// Configurar router de courses para todas las rutas que empiecen con '/api/courses'
app.use('/api/courses', courses);

app.use('/', home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
