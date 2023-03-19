const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: String,
        },
        imageURL: {
            type: String,
        },
        location: {
            type: String,
        },
        votes: {
            type: Number,
            default: 0,
        },
        keywords: [],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Grievance', grievanceSchema);
