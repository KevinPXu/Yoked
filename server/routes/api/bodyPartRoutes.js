const router = require("express").Router();

const {
    getBodyParts,
    getSingleBodyPart,
    createBodyPart,
    removeBodyPart
} = require("../../controllers/BodyPartController")

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getBodyParts).post(authMiddleware, createBodyPart);

router.route('/:id').get(authMiddleware, getSingleBodyPart).delete(removeBodyPart);

module.exports = router;