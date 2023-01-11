const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb://127.0.0.1/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

const schema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('courses', schema);

async function getExercise1() {
  const result = await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(result);
}

async function getExercise2() {
  const result = await Course.find({
    isPublished: true,
    tags: { $in: ['frontend', 'backend'] },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });
  console.log(result);
}

async function getExercise3() {
  const result = await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
  console.log(result);
}

getExercise3();
