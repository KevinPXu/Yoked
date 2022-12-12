const { Schema, model } = require('mongoose');
const Exercise = require('./Exercise');

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
});

const Template = model('template', templateSchema);

module.exports = Template;