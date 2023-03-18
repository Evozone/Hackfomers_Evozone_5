const CommentModel = require('../models/commentModel');
const GrievanceModel = require('../models/grievanceModel');
const UserModel = require('../models/userModel');

exports.createComment = async (req, res) => {
    try {
        const { uid, text, createdBy, createdAt, grievance } = req.body;
        const comment = await CommentModel.create({
            uid,
            text,
            createdBy,
            createdAt,
            grievance,
        });
        await UserModel.findByIdAndUpdate(createdBy, {
            $push: { comments: comment._id },
        });
        await GrievanceModel.findByIdAndUpdate(grievance, {
            $push: { comments: comment._id },
        });
        res.status(201).json({
            success: true,
            result: comment,
            message: 'Comment created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.getComment = async (req, res) => {
    try {
        const comment = await CommentModel.findById(req.params.id).populate(
            'createdBy'
        );
        if (!comment) {
            res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }
        res.status(200).json({
            success: true,
            result: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.getCommentsForGrievance = async (req, res) => {
    try {
        const grievance = await GrievanceModel.findById(req.params.id);
        if (!grievance) {
            return res.status(404).json({
                success: false,
                message: 'Grievance not found',
            });
        }
        const comments = await CommentModel.find({
            grievance: grievance._id,
        }).populate('createdBy');
        res.status(200).json({
            success: true,
            result: comments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};
