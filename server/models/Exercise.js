const { Schema, model } = require("mongoose");
const BodyPart = require('./BodyPart')

const exerciseSchema = new Schema({
    exerciseId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    name: {
        type: String,
        required: 'Exercise must be named',
        trim: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
})

const Exercise = model('exercise', exerciseSchema)

module.exports = Exercise;