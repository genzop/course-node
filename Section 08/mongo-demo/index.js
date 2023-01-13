const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb://127.0.0.1/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    // Obligatorio
    required: true,
    // Largo minimo
    minlength: 5,
    // Largo maximo
    maxlength: 255,
    // Expresion regular
    // match: /pattern/,
  },
  category: {
    type: String,
    // Enum
    enum: ['web', 'mobile', 'network'],
    // Convertir a minusculas
    lowercase: true,
    // Convertir a mayusculas
    // uppercase: true
    // Eliminar espacios vacios al principio y al final
    trim: true,
  },
  author: {
    type: String,
    // Custom validation
    validate: {
      validator: function (value) {
        return value && value.length > 3;
      },
      message: 'Invalid author name.',
    },
  },
  tags: {
    type: Array,
    // Custom async validation
    validate: {
      validator: function (value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = value && value.length > 0;
            resolve(result);
          }, 500);
        });
      },
      message: 'A course should have at least one tag.',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    // Obligatorio dependiendo de otra propiedad
    required: function () {
      return this.isPublished;
    },
    // Valor minimo
    min: 10,
    // Valor maximo
    max: 200,
    // Obtener valor con formato personalizado
    get: (value) => Math.round(value),
    // Guardar valor con formato personalizado
    set: (value) => Math.round(value),
  },
});

const Course = mongoose.model('courses', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 15.7,
  });

  try {
    const result = await course.save();
    console.log(result);

    // Validar modelo manualmente
    // await course.validate();
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = 'Another Author';
  course.save();
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

createCourse();
