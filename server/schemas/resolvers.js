const { AuthenticationError } = require('apollo-server-express');
const { User, Template, History, ExerciseType, BodyPart, ExerciseInstance } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()            
            .populate('templates')
            .populate('exercises')
            .populate('bodyParts')
            .populate('history')
            .populate({
                path: 'templates',
                populate: {
                    path: 'exercises',
                    model: 'exercise'
                }
            })
            .populate({
                path: 'templates',
                populate: {
                    path: 'exercises',
                    populate: {
                        path:'exerciseType',
                        model: 'exerciseType'
                    }
                }
            });
        },
        user: async (parent, { _id }) => {
            return User.findOne({
                _id: _id
            })
            .populate('templates')
            .populate('exercises')
            .populate('bodyParts')
            .populate('history')
            .populate({
                path: 'templates',
                populate: {
                    path: 'exercises',
                    model: 'exercise'
                }
            })
            .populate({
                path: 'templates',
                populate: {
                    path: 'exercises',
                    populate: {
                        path:'exerciseType',
                        model: 'exerciseType'
                    }
                }
            });

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
            return Template.find().populate({
                path: 'exercises',
                populate: {
                    path: 'exerciseType',
                    model: 'exerciseType'
                }
            });
        },
        template: async (parent, { _id }) => {
            return Template.findOne({ _id }).populate({
                path: 'exercises',
                populate: {
                    path: 'exerciseType',
                    model: 'exerciseType'
                }
            });
        },
        exerciseTypes: async () => {
            return ExerciseType.find()
        },
        exerciseType: async (parent, { _id }) => {
            return ExerciseType.findOne({ _id })
        },
        exerciseInstances: async() => {
            return ExerciseInstance.find()
        },
        exerciseInstance: async() => {
            return ExerciseInstance.findOne( { _id })
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
            const defaultTemplates = await Template.find( { default: true })
            const user = await User.create({ name, password, loggedIn: true, templates: defaultTemplates.map((elem) => elem._id)});
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
            console.log(userId)
            const newTemplate = await Template.create({ name, exercises })
            console.log(newTemplate)
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { templates: newTemplate._id } },
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
        addExerciseType: async (parent, { userId, name, bodyParts}) => {
            const exercise = await ExerciseType.create({name, bodyParts});
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { exercises: exercise._id } },
                { new: true }
            )
            return exercise
        },
        updateExerciseType: async (parent, { _id, name, bodyParts, sets, reps }) => {
            return ExerciseType.findOneAndUpdate(
                { _id },
                { name, bodyParts, sets, reps },
                { runValidators: true, new: true }
            )
        },
        removeExerciseType: async (parent, { _id }) => {
            const removed = await ExerciseType.findOneAndDelete({ _id });
            await User.findOneAndUpdate(
                { exercises: _id },
                { $pull: { exercises: _id } },
                { new: true }
            )
            return removed
        },
        addExerciseInstance: async (parent, { userId, exerciseType, sets }) => {
            const exerciseInstance = await ExerciseInstance.create({userId, exerciseType, sets})
            return exerciseInstance
        },
        updateExerciseInstance: async (parent, { _id, sets }) => {
            return ExerciseInstance.findOneAndUpdate(
                { _id },
                { sets },
                { runValidators: true, new: true }
            )
        },
        removeExerciseInstance: async (parent, { _id }) => {
            const removed = await ExerciseInstance.findOneAndDelete({ _id });
            return removed;
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