const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    async getUsers(req, res) {
        const foundUsers = await User.find();
        if (!foundUsers) {
            return res.status(400).json({
                message: "Cannot find users"
            });
        }
        res.json(foundUsers);
    },
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        }).select("__v")
            .populate('template')
            .populate('exercises')
            .populate('bodyParts')
            .populate('history');

        if (!foundUser) {
            return res.status(400).json({
                message: "Cannot find a user with this id!"
            })
        }
        res.json(foundUser);
    },
    async createUser(req, res) {
        const user = await User.create(req.body);

        if (!user) {
            return res.status(400).json({
                message: 'Something is wrong!'
            });
        }
        const token = signToken(user);
        res.json({
            token, user
        });
    },
    async login(req, res) {
        const user = await User.findOne({
            $or: [{
                username: body.username
            }, {
                email: body.email
            }]
        });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: "Wrong password!" });
        }
        const token = signToken(user);
        res.json({
            token, user
        });
    },

}