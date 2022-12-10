const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        templates: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Template'
            }
        ],
        exercises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Exercise'
            }
        ],
        bodyParts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BodyPart'
            }
        ],
        history: [
            {
                type: Schema.Types.ObjectId,
                ref: 'History'
            }
        ],
        loggedIn: {
            type: Boolean,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const User = model('user', userSchema);

module.exports = User;