const { isAuthorized } = require('../../utils/jwt');
const { UnauthorizedError } = require('../../utils/errors/UnauthorizedError');

module.exports = async (req, res, next) => {
  try {
    const isAuth = await isAuthorized(req.cookies.jwt);
    if (isAuth) {
      req.user = {
        _id: isAuth,
      }
      next();
    } else {
      throw new UnauthorizedError('Ошибка авторизации');
    }
  } catch (error) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
};
