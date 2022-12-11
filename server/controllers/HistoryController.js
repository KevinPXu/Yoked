const { History, User } = require('../models/');

module.exports = {
    async getHistory(req, res) {
        const userHistory = await User.find({ _id: req.params.userId })
            .populate({
                path: 'history',
                populate: {
                    path: 'exercises',
                    model: 'exercise'
                }
            });
        !history
            ? res.status(404).json({ message: `Couldn't find a user with that ID!`})
            : res.json(userHistory);
     },

    async saveToHistory(req, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { history: req.body } },
            { runValidators: true, new: true }
        );
        !updatedUser 
            ? res.status(404).json({ message: `Couldn't find a user with that ID!` })
            : res.json(updatedUser);
    },

    async getSingleHistory(req, res) {
        const history = await History.findOne({ historyId: req.params.historyId })
            .populate('exercises');
        !history
            ? res.status(404).json({ message: `Couldn't find a history with that ID!`})
            : res.json(history);
    }
}