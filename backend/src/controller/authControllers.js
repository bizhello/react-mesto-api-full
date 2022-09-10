const bcrypt = require('bcrypt');

const { User } = require('../models/userModels');
const { UnauthorizedError } = require('../../utils/errors/UnauthorizedError');
const { ConflictError } = require('../../utils/errors/ConflictError');
const { BadRequestError } = require('../../utils/errors/BadRequestError');

const { getJwtToken } = require('../../utils/jwt');

const SALT_ROUNDS = 10;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильно указан логин и/или пароль!');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedError('Неправильно указан логин и/или пароль!');
    }
    const token = getJwtToken(user.id);
    res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send({ id: user.id });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      email, password: hash, name, about, avatar,
    });
    const dataUser = await newUser.save();
    res.send({
      email, name: dataUser.name, about: dataUser.about, avatar: dataUser.avatar,
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie('jwt').send({ message: 'Выход' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  createUser,
  logout,
};
