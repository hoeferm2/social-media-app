const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, Unique: true, Require: true, Trimmed: true },
        email: {
            type: String, Require: true, Unique: true, match: [
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        // friends.lenght?
        return this.meta.upvotes;
    });


// Initialize our User model
const User = model('users', userSchema);

module.exports = User;
