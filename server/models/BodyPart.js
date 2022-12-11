const { Schema, model, Types } = require("mongoose");

const bodyPartSchema = {
    bodyPartId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    name: {
        type: String,
        required: 'Body part must be named',
        trim: true
    },
}

const BodyPart = model('bodyPart', bodyPartSchema);

module.exports = BodyPart;