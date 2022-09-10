const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const getJwtToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' },
);

const isAuthorized = async (token) => {
  try {
    const decoded = await jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    return decoded.id;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getJwtToken,
  isAuthorized,
};
