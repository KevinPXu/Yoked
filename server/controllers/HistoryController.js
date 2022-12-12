const { History, User } = require('../models/');

module.exports = {
    // GET to /users/:userId/history
    async getHistory(req, res) {
        const userHistory = await User.findOne({ _id: req.user._id })
            .populate({
                path: 'history',
                populate: {
                    path: 'exercises',
                    model: 'exercise'
                }
            });
        !userHistory
            ? res.status(404).json({ message: `Couldn't find a user with that ID!`})
            : res.json(userHistory.history);
     },

    // POST to /users/:userId/history
    async saveToHistory(req, res) {
        const newHistory = await History.create(req.body);
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { history: newHistory._id } },
            { new: true }
        );
        !updatedUser 
            ? res.status(404).json({ message: `Couldn't find a user with that ID!` })
            : res.json(updatedUser);
    },

    // GET to /users/:userId/history/:historyId
    async getSingleHistory(req, res) {
        const history = await History.findOne({ _id: req.params.historyId })
            .populate('exercises');
        !history
            ? res.status(404).json({ message: `Couldn't find a history with that ID!`})
            : res.json(history);
    }
}