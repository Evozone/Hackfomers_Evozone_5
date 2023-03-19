const OrgModel = require('../models/orgModel');
const UserModel = require('../models/userModel');

exports.getAllOrgs = async (req, res) => {
    try {
        const orgs = await OrgModel.find().populate('createdBy');
        res.status(200).json({
            success: true,
            result: orgs,
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

exports.getOrg = async (req, res) => {
    try {
        const org = await OrgModel.findById(req.params.id).populate(
            'createdBy'
        ).populate('admin').populate('members');
        if (!org) {
            res.status(404).json({
                success: false,
                message: 'Org not found',
            });
        }
        res.status(200).json({
            success: true,
            result: org,
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

exports.createOrg = async (req, res) => {
    try {
        const {
            uid,
            name,
            about,
            avatarURL,
            createdBy,
            createdAt,
            website,
            admin,
        } = req.body;
        const org = await OrgModel.create({
            uid,
            name,
            about,
            avatarURL,
            createdBy,
            createdAt,
            website,
            admin,
        });
        await UserModel.findByIdAndUpdate(createdBy, {
            $push: { organizations: org._id },
        });
        res.status(201).json({
            success: true,
            result: org,
            message: 'Org created',
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
