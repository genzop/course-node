const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model(
  'genres',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
  })
);

function validate(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validate;
