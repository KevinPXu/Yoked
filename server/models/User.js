const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
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

userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;