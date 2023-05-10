const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res, next) => {
  const error = new Error('Unknown route.');
  error.status = 404;
  next(error);
});

module.exports = router;
