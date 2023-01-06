const express = require('express');
// Importar libreria de validaciones Joi, en este caso esto devuelve una clase por eso va con mayusculas
const Joi = require('joi');

const app = express();

// Configurar middleware para trabajar con el body de un request como JSON
app.use(express.json());

const courses = [
  { id: 1, name: 'Course #1' },
  { id: 2, name: 'Course #2' },
  { id: 3, name: 'Course #3' },
];

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

function validateCourse(course) {
  // Configurar schema de validacion para el objeto 'Course'
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // Validar request recibido utilizando el schema configurado
  return schema.validate(course);
}
