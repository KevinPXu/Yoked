const { AuthenticationError } = require('apollo-server-express');
const { User, Template, History, Exercise, BodyPart } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, { _id }) => {
            return User.findOne({
                _id: _id
            })
                .populate('templates')
                .populate('exercises')
                .populate('bodyParts')
                .populate('history');

        },
        historys: async (parent, { userId }) => {
            const userHistory = await User.findOne({ _id: userId })
                .populate({
                    path: 'history',
                    populate: {
                        path: 'exercises',
                        model: 'exercise'
                    }
                });
            return userHistory.history
        },
        history: async (parent, { historyId }) => {
            return History.findOne({ _id: historyId })
                .populate('exercises');
        },
        templates: async () => {
            return Template.find().populate('exercises')
        },
        template: async (parent, { _id }) => {
            return Template.findOne({ _id })
        },
        exercises: async () => {
            return Exercise.find()
        },
        exercise: async (parent, { _id }) => {
            return Exercise.findOne({ _id })
        },
        bodyParts: async () => {
            return BodyPart.find()
        },
        bodyPart: async (parent, { _id }) => {
            return BodyPart.find({ _id })
        }
    },

    Mutation: {
        addUser: async (parent, { name, password }) => {
            const user = await User.create({ name, password, loggedIn: true });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { name, password }) => {
            const user = await User.findOne({ name })

            if (!user) {
                throw new AuthenticationError('No user found with this username')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addHistory: async (parent, { userId, exercises }) => {
            const newHistory = await History.create({ exercises });
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { history: newHistory._id } },
                { new: true }
            );
            return newHistory
        },
        addTemplate: async (parent, { userId, name, exercises }) => {
            const newTemplate = await Template.create({ name, exercises })
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { history: newTemplate._id } },
                { new: true }
            )
            return newTemplate
        },
        updateTemplate: async (parent, { _id, name, exercises }) => {
            return Template.findOneAndUpdate(
                { _id },
                { name, exercises },
                { runValidators: true, new: true }
            )
        },
        removeTemplate: async (parent, { _id }) => {
            const removed = await Template.findOneAndDelete({ _id });
            await User.findOneAndUpdate(
                { templates: _id },
                { $pull: { templates: _id } },
                { new: true }
            )
            return removed
        },
        addExercise: async (parent, { userId, name, bodyParts, sets, reps }) => {
            const exercise = await Exercise.create({name, bodyParts, sets, reps});
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { exercises: exercise._id } },
                { new: true }
            )
            return exercise
        },
        updateExercise: async (parent, { _id, name, bodyParts, sets, reps }) => {
            return Exercise.findOneAndUpdate(
                { _id },
                { name, bodyParts, sets, reps },
                { runValidators: true, new: true }
            )
        },
        removeExercise: async (parent, { _id }) => {
            const removed = await Exercise.findOneAndDelete({ _id });
            await User.findOneAndUpdate(
                { exercises: _id },
                { $pull: { exercises: _id } },
                { new: true }
            )
            return removed
        },
        addBodyPart: async (parent, { userId, name }) => {
            const bodyPart = await BodyPart.create({name});
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { bodyParts: bodyPart._id } },
                { new: true }
            )
            return bodyPart
        },
        updateBodyPart: async (parent, { _id, name, }) => {
            return BodyPart.findOneAndUpdate(
                { _id },
                { name },
                { runValidators: true, new: true }
            )
        },
        removeBodyPart: async (parent, { _id }) => {
            const removed = await BodyPart.findOneAndDelete({ _id });
            await User.findOneAndUpdate(
                { bodyParts: _id },
                { $pull: { bodyParts: _id } },
                { new: true }
            )
            return removed
        },
    }
}

module.exports = resolvers;