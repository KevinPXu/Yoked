const { Schema, model, Types } = require("mongoose");

const setSchema = new Schema({
    reps: {
        type: Number,
        required: true
    },
    weight: {type: Number, required: true}
})

module.exports = setSchema;