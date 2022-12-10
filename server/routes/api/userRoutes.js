const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    login
} = require('../../controllers/UserController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(authMiddleware, getSingleUser);

router.route('/login').post(login);

module.exports = router;