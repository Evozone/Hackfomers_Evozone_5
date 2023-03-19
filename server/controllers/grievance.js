const GrievanceModel = require('../models/grievanceModel');
const UserModel = require('../models/userModel');
const OrgModel = require('../models/orgModel');

// @route   POST /grievance/create
// @desc    Create a grievance
// @access  Private
exports.createGrievance = async (req, res) => {
    try {
        const {
            uid,
            title,
            description,
            status,
            organization,
            createdBy,
            createdAt,
            imageURL,
            location,
            views,
            comments,
            keywords,
        } = req.body;
        const grievance = await GrievanceModel.create({
            uid,
            title,
            description,
            status,
            organization,
            createdBy,
            createdAt,
            imageURL,
            location,
            views,
            comments,
            keywords,
        });
        await UserModel.findByIdAndUpdate(createdBy, {
            $push: { grievances: grievance._id },
        });
        await OrgModel.findByIdAndUpdate(organization, {
            $push: { grievances: grievance._id },
        });
        res.status(201).json({
            success: true,
            result: grievance,
            message: 'Grievance created',
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

// @route   GET /grievance/:id
// @desc    Get a grievance
// @access  Public
exports.getGrievance = async (req, res) => {
    try {
        const { id } = req.params;
        const grievance = await GrievanceModel.findById(id)
            .populate({
                path: 'organization',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                },
            })
            .populate('createdBy')
            .populate({
                path: 'comments',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                },
            });

        if (!grievance) {
            res.status(404).json({
                success: false,
                message: 'Grievance not found',
            });
        }
        res.status(200).json({
            success: true,
            result: grievance,
            message: 'Grievance found',
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

// @route   GET /grievance
// @desc    Get all grievances
// @access  Public
exports.getAllGrievances = async (req, res) => {
    try {
        const grievances = await GrievanceModel.find()
            .populate({
                path: 'organization',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                },
            })
            .populate('createdBy')
            .populate('comments');
        res.status(200).json({
            success: true,
            result: grievances,
            message: 'Grievances found',
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

exports.checkGrievance = async (req, res) => {
    try {
        const { location, keywords } = req.body;
        const keyword = {
            $or: keywords.map((word) => {
                return {
                    keywords: {
                        $elemMatch: {
                            keyword: { $regex: word.keyword, $options: 'i' },
                        },
                    },
                };
            }),
        };
        console.log(keyword, location);
        const grievances = await GrievanceModel.find(keyword)
            .find({
                location,
            })
            .populate('organization')
            .populate('createdBy')
            .populate('comments');
        res.status(200).json({
            success: true,
            result: grievances,
            message: 'Grievances found',
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
