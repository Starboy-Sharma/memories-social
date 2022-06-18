const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

// Users Schema
const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            minLength: 3,
            maxLength: 100,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: "Email cannot be empty"
        },

        password: {
            type: String,
            minLength: 8,
            maxLength: 50,
        },

        status: {
            type: String,
            default: "active",
            enum: {
                values: ["active", "blocked", "deleted", "pending"]
            }
        }
    },
    { timestamps: true }
);

UserSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


const user = mongoose.model("users", UserSchema);
module.exports = user;