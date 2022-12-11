const { History, User } = require('../models/');

module.exports = {
    // route probably needs to be /users/:userId/history
    async getHistory(req, res) {
        const userHistory = await User.find({ _id: req.params.userId })
            .populate('history');
        !history
            ? res.status(404).json({ message: `Couldn't find a user with that ID!`})
            : res.json(userHistory);
     },

    // POST to /users/:userId/history
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

    // /users/:userId/history/:historyId
    async getSingleHistory(req, res) {
        const history = await History.findOne({ historyId: req.params.historyId });
        !history
            ? res.status(404).json({ message: `Couldn't find a history with that ID!`})
            : res.json(history);
    }
}