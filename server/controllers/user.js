const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.googleSignUp = async (req, res) => {
    let { uid, email, name, avatarURL, username, socialLinks } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            const token = jwt.sign(
                { ...oldUser._doc },
                process.env.HMS_SECRET_APP,
                {
                    expiresIn: '48h',
                }
            );
            res.status(200).json({
                success: 'true',
                result: { ...oldUser._doc, token },
                message: 'User already exists',
            });
        } else {
            const user = await UserModel.create({
                uid,
                email,
                name,
                avatarURL,
                username,
                socialLinks,
            });
            const token = jwt.sign(
                { ...user._doc },
                process.env.HMS_SECRET_APP,
                {
                    expiresIn: '48h',
                }
            );
            res.status(201).json({
                success: true,
                result: { ...user._doc, token },
                message: 'User created',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.editProfile = async (req, res) => {
    try {
        const { uid } = req.user;
        const { name, avatarURL, socialLinks } = req.body;
        const user = await UserModel.findOne({ uid });
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const updatedUser = await UserModel.findOneAndUpdate(
            { uid },
            { name, avatarURL, socialLinks },
            { new: true }
        );
        const token = jwt.sign(
            { ...updatedUser._doc },
            process.env.HMS_SECRET_APP,
            {
                expiresIn: '48h',
            }
        );
        res.status(200).json({
            success: true,
            result: { ...updatedUser._doc, token },
            message: 'User updated',
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
