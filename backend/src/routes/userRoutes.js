const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, patchUser, patchUserAvatar, aboutMe,
} = require('../controller/userControllers');
const { regexUrl } = require('../../utils/regexs');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/me', aboutMe);

userRoutes.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl),
  }),
}), patchUserAvatar);

module.exports = {
  userRoutes,
};
