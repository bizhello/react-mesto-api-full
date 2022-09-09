const { User } = require('../models/userModels');

const { NotFoundError } = require('../../utils/errors/NotFoundError');
const { BadRequestError } = require('../../utils/errors/BadRequestError');

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).orFail(() => new NotFoundError('Пользователь с указанным id не существует'));
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Пользователь с таким id не найден'));
    } else {
      next(error);
    }
  }
}

async function patchUser(req, res, next) {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

async function patchUserAvatar(req, res, next) {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      runValidators: true,
      new: true,
    });
    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

async function aboutMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id).orFail(() => new NotFoundError('Пользователь с таким id не найден'));
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Пользователь с таким id не найден'));
    } else {
      next(error);
    }
  }
}

module.exports = {
  getUsers,
  getUserById,
  aboutMe,
  patchUser,
  patchUserAvatar,
};
