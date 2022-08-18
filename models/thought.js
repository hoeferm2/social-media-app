const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
    {
        published: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        meta: {
            upvotes: Number,
            bookmarks: Number,
        },
        text: {
            type: String,
            minLength: 15,
            maxLength: 500,
        },
        // TODO: create reactions
        reactions: [
            {}
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// TODO: Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.meta.reactions;
    });

// Initialize our thought model
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;
