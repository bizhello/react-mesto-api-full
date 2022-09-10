const { Card } = require('../models/cardModels');
const { NotFoundError } = require('../../utils/errors/NotFoundError');
const { ForbiddenError } = require('../../utils/errors/ForbiddenError');
const { BadRequestError } = require('../../utils/errors/BadRequestError');

async function getCards(req, res, next) {
  try {
    console.log('CARDS', req.user._id);
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
}

async function postCards(req, res, next) {
  try {
    const card = new Card(req.body);
    card.owner = req.user._id;
    await card.save();
    res.send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при создании карточки'));
    } else {
      next(error);
    }
  }
}

async function deleteCards(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundError('Карточка была уже удалена');
    } else if (req.user._id === String(card.owner)) {
      await Card.deleteOne({ _id: req.params.cardId });
      res.send({ message: 'Карточка удалена' });
    } else {
      throw new ForbiddenError('Удалять можно только свои карточки');
    }
  } catch (error) {
    next(error);
  }
}

async function likeCard(req, res, next) {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Пользователь с указанным id не существует'));
    res.send(newCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Данные по этому id не найдены'));
    } else {
      next(error);
    }
  }
}

async function dislikeCard(req, res, next) {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Пользователь с указанным id не существует'));
    res.send(newCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Данные по этому id не найдены'));
    } else {
      next(error);
    }
  }
}

module.exports = {
  getCards,
  postCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
