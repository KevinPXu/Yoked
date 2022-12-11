const { Schema, model } = require("mongoose");

const bodyPartSchema = {
    name: {
        type: String,
        required: 'Body part must be named',
        trim: true
    },
}

const BodyPart = model('bodyPart', bodyPartSchema);

module.exports = BodyPart;