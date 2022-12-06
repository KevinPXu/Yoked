const { Schema, model } = require('mongoose');
const Exercises = require('./Exercises');

const templateSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    id: {
        required: true,
        type: String
    },
    exercises: {
        type: String,
        required: true

    },
});

const Template = model('template', templateSchema);

module.exports = Template;