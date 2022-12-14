const { Schema, model, Types } = require("mongoose");
const Set = require('./Set');

const exerciseSchema = new Schema({
    exerciseType: {type: Schema.Types.ObjectId, ref: 'exerciseType'},
    sets: [Set]
})

const ExerciseInstance = model('exercise', exerciseSchema)

module.exports = ExerciseInstance;