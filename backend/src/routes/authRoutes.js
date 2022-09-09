const express = require('express');
const { celebrate, Joi } = require('celebrate');

const authRoutes = express.Router();
const {
  createUser, login, logout,
} = require('../controller/authControllers');
const { regexUrl } = require('../../utils/regexs');

authRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
  }),
}), createUser);

authRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

authRoutes.post('/logout', logout);

module.exports = {
  authRoutes,
};
