const express = require('express');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { authRoutes } = require('./authRoutes');
const { routeSecurity } = require('./routeSecurity');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use('/', authRoutes);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use('*', routeSecurity);

module.exports = {
  routes,
};
