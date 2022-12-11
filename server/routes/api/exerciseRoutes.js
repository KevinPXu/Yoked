const router = require("express").Router()

const {
    getExercises,
    getSingleExercise,
    updateExercise,
    deleteExercise,
    createExercise
} = require ('../../controllers/ExerciseController')

const { authMiddleware } = require('../../utils/auth')

router.route('/').get(getExercises).post(authMiddleware, createExercise)

router.route('/:id').get(authMiddleware, getSingleExercise).put(authMiddleware, updateExercise).delete(authMiddleware, deleteExercise)

module.exports = router;