const { Schema, model, Types } = require("mongoose");

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: 'Exercise must be named',
        trim: true,
        unique: true
    },
    bodyParts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'bodyPart'
        }
    ]
})

const ExerciseType = model('exerciseType', exerciseSchema)

module.exports = ExerciseType;