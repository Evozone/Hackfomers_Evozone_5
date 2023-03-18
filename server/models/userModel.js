const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema({
    twitter: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
});

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Please Enter Your Email'],
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatarURL: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Please Enter Your Username'],
            unique: true,
        },
        grievances: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grievance',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        organizations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Organization',
                isAdmin: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        socialLinks: socialLinksSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
