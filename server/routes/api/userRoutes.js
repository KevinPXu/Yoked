const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  login,
} = require('../../controllers/UserController');

const {
  getHistory,
  saveToHistory,
  getSingleHistory,
} = require('../../controllers/HistoryController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getUsers).post(createUser);

router.route('/history').get(authMiddleware, getHistory).post(authMiddleware, saveToHistory);

router.route('/:id').get(authMiddleware, getSingleUser);

router.route('/login').post(login);

router.route('/history/:historyId').get(authMiddleware, getSingleHistory);

module.exports = router;
