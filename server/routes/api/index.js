const router = require('express').Router();
const userRoutes = require('./userRoutes');
const templateRoutes = require('./templateRoutes');
const bodyPartRoutes = require('./bodyPartRoutes')


router.use('/user', userRoutes);
router.use('./template', templateRoutes);
router.use('/bodyparts', bodyPartRoutes)

module.exports = router;
