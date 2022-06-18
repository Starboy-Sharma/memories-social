const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

// User Followe & Follower Schema
const userFollowerSchema = mongoose.schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'users',
        },

        followerId: {
            type: Types.ObjectId,
            ref: 'users'
        }
    },
    { timestamps: true }
);

const userFollower = mongoose.model('userfollowers', userFollowerSchema);
module.exports = userFollower;