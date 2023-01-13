const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'customers',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phone: {
      type: String,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

const validate = (customer) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validate;
