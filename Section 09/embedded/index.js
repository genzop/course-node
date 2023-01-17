const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    // Crear relacion anidando otro documento
    author: authorSchema,
    // Crear relacion obligatoria anidando otro documento
    author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Si se quiere actualizar una propiedad de un author, se debe partir desde el course que lo contiene.
  const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani';
  course.save();

  // Tambien se puede actualizar un author de la siguiente manera
  const course2 = await Course.updateMany(
    { _id: courseId },
    {
      $set: {
        'author.name': 'John Smith',
      },
    }
  );

  // Incluso se puede eliminar una propiedad anidada
  const course3 = await Course.updateMany(
    { _id: courseId },
    {
      $unset: {
        author: '',
      },
    }
  );
}

// Al crear el Course, se crea tambien el objeto anidado
// createCourse('Node Course', new Author({ name: 'Mosh' }));

updateAuthor('63c5c652c7003570b2882fb1');
