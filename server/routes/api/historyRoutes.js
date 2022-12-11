const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const { 
    getHistory, 
    saveToHistory, 
    getSingleHistory 
} = require('../../controllers/HistoryController');


router.route('/').get(authMiddleware, getHistory).post(authMiddleware, saveToHistory);

router.route('/:historyId').get(authMiddleware, getSingleHistory);

module.exports = router;