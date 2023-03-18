const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        grievance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grievance',
        },
        createdAt: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
