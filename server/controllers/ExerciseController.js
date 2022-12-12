const { Exercise, User } = require('../models/');

module.exports = {
    async getExercises(req, res) {
        const foundExercises = await Exercise.find()
        if (!foundExercises) {
            return res.status(400).json({
                message: "cannot find exercises"
            })
        }
        res.json(foundExercises)
    },
    async createExercise({ user, body }, res) {
        const exercise = await Exercise.create(body);
        if (!exercise) {
            return res.status(400).json({
                message: "Unable to create exercise"
            })
        }
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { exercises: exercise._id } },
            { new: true }
        )
        res.json(exercise)
    },
    async getSingleExercise(req, res) {
        const foundExercise = await Exercise.findOne({_id: req.params.id}).populate('bodyParts');
        if (!foundExercise) {
            return res.status(400).json({
                message: "cannot find exercise with id"
            })
        }
        res.json(foundExercise)
    },
    async updateExercise(req, res) {
        const updatedExercise = await Exercise.findOneAndUpdate(
            { _id: req.params.id },
            { ...req.body },
            { new: true}
        )
        !updatedExercise
            ? res.status(404).json({ message: `Couldn't find an exercise with that ID!` })
            : res.json(updatedExercise);
    },
    async deleteExercise(req, res) {
        const deletedExercise = await Exercise.findOneAndDelete({_id: req.params.id})
        !deletedExercise
        ? res.status(404).json({ message: `Couldn't find an exercise with that ID!` })
        : res.json(deletedExercise);
    }
}
