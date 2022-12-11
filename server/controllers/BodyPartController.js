const { BodyPart, User } = require('../models');

module.exports = {
    async getBodyParts(req, res) {
        const foundBodyParts = await BodyPart.find();
        if (!foundBodyParts) {
            return res.status(400).json({
                message: "Cannot find body parts :/"
            });
        }
        res.json(foundBodyParts)
    },
    async createBodyPart({ user, body }, res) {
        const bodyPart = await BodyPart.create(body);
        if (!bodyPart) {
            return res.status(400).json({
                message: "Unable to create body part"
            })
        }
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id},
            { $push: { bodyParts: bodyPart._id }},
            { new: true}
        )
        res.json(bodyPart)
    }, 
    async getSingleBodyPart(req, res) {
        const foundBodyPart = await BodyPart.findOne({_id: req.params.id});
        if (!foundBodyPart) {
            return res.status(400).json({
                message: "Cannot find body part with this id :/"
            });
        }
        res.json(foundBodyPart)
    },
    async removeBodyPart(req, res) {
        const removedBodyPart = await BodyPart.findOneAndDelete({_id: req.params.id});
        if (!removedBodyPart) {
            return res.status(400).json({
                message: "Cannot find body part with this id :/"
            });
        }
        res.json(removedBodyPart)
    }
}