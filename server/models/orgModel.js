const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        avatarURL: {
            type: String,
        },
        website: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: String,
        },
        admin: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        grievances: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grievance',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Organization', orgSchema);
