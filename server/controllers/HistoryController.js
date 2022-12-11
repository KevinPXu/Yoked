const { History, User } = require('../models/');

module.exports = {
    // if history is changed to be subdoc of User, getHistory would be the same as getSingleUser
    // async getHistory(req, res) { },

    // route probably needs to be /users/:userId/history
    async saveToHistory(req, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { history: req.body } },
            { runValidators: true, new: true }
        );
        !updatedUser 
            ? res.status(404).json({ message: `No user found with that ID!` })
            : res.json(updatedUser);
    },

    async getSingleHistory(req, res) {
        
    }
}