const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bodyPartRoutes = require('./bodyPartRoutes')
const exerciseRoutes = require('./exerciseRoutes')

router.use('/users', userRoutes);
router.use('/bodyparts', bodyPartRoutes)
router.use('/exercises', exerciseRoutes)

module.exports = router;
