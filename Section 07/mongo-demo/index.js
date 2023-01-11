const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Conectar con una base de datos de MongoDB
mongoose
  .connect('mongodb://127.0.0.1/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

// Schema: representa la estructura de un documento, similar a una tabla
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Model: se crea un model a partir de un schema. Este funciona como una clase.
const Course = mongoose.model('courses', courseSchema);

async function createCourse() {
  // Objeto: se crea una instancia de ese modelo
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });

  // Guardar objeto en la base de datos
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // Consultar todos
  const courses = await Course.find();

  // Consultar con filtros, ordenado y seleccionando solo algunas propiedades
  const courses2 = await Course.find({
    author: 'Mosh',
    isPublished: true,
  })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  // Comparison Query Operators
  //   - eq (Igual)
  //   - ne (Diferente)
  //   - gt (Mayor)
  //   - gte (Mayor o Igual)
  //   - lt (Menor)
  //   - lte (Menor o Igual)
  //   - in
  //   - nin (No en)
  const courses3 = await Course.find({ price: { $gte: 10, $lte: 20 } });
  const courses4 = await Course.find({ price: { $in: [10, 15, 20] } });

  // Logical Query Operators
  //   - or
  //   - and
  const courses5 = await Course.find().or([
    { author: 'Mosh' },
    { isPublished: true },
  ]);

  // Regular Expresions
  // Empieza con 'Mosh'
  const courses6 = await Course.find({ author: /^Mosh/i });
  // Termina con 'Hamedani'
  const courses7 = await Course.find({ author: /Hamedani$/i });
  // Contiene 'Mosh'
  const courses8 = await Course.find({ author: /.*Mosh.*/i });

  // Count
  const courses9 = await Course.find().count();

  // Pagination
  const pageNumber = 1;
  const pageSize = 10;
  const courses10 = await Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
}

async function updateCourse(id) {
  // Query first: primero se busca el documento y luego se actualiza
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = 'Another Author';
  course.save();
  console.log(course);

  // Update first: primero se actualiza y luego se busca (utilizar MongoDb Update Operators)
  const course2 = await Course.findByIdAndUpdate(
    { _id: id },
    { $set: { author: 'Jason', isPublished: true } },
    { new: true }
  );
  console.log(course2);
}

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

removeCourse('63bea72e2c0339cc54625cd8');
