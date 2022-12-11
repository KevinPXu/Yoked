const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bodyPartRoutes = require('./bodyPartRoutes')

router.use('/users', userRoutes);
router.use('/bodyparts', bodyPartRoutes)

module.exports = router;
