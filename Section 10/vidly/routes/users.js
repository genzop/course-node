const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  // Consultar usuario actual utilizando el id del usuario provisto por el middleware de autorizacion
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // Obtener solo algunas propiedades de un objeto utilizando 'Lodash'
  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  // Hashear password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  // Agregar custom header al response
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
