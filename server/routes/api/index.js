const router = require('express').Router();
const userRoutes = require('./userRoutes');
const templateRoutes = require('./templateRoutes');

router.use('./template', templateRoutes);
router.use('/user', userRoutes);

module.exports = router;
