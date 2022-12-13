const { Schema, model } = require('mongoose');
const Exercise = require('./ExerciseType');

const templateSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'exercise'
        }
    ],
    default: {type: Boolean, default: false}
});

const Template = model('template', templateSchema);

module.exports = Template;