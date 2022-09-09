const { NotFoundError } = require('../../utils/errors/NotFoundError');

async function routeSecurity(req, res, next) {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  routeSecurity,
};
