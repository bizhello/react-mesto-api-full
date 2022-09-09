const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: { validator: isEmail, message: 'Invalid email.' },
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: { validator: isURL, message: 'Avatar is invalid' },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

// userSchema.set('validateBeforeUpdate', false);
module.exports.User = model('user', userSchema);
