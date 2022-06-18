const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

// posts model
const PostsSchema = mongoose.Schema(
    {
        caption: {
            type: String,
            default: ''
        },

        userId: {
            type: Types.ObjectId,
            ref: 'users',
        },

        images: {
            required: true,
            type: Array,
        },

        viewCount: {
            type: Number,
            default: 0,
        }, 

        likesCount: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            default: 'active',
            enum: {
                values: ['active', 'deleted', 'blocked']
            }
        }
    },

    { timestamps: true }
);

const posts = mongoose.model('posts', PostsSchema);
module.exports = posts;