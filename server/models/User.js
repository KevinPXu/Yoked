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
                ref: 'template'
            }
        ],
        exercises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'exercise'
            }
        ],
        bodyParts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'bodyPart'
            }
        ],
        history: [
            {
                type: Schema.Types.ObjectId,
                ref: 'history'
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