const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedTocken = jwt.verify(token, process.env.HMS_SECRET_APP);
        const {
            _id,
            uid,
            name,
            avatarURL,
            email,
            username,
            grievances,
            comments,
            organizations,
            socialLinks,
        } = decodedTocken;
        req.user = {
            _id,
            uid,
            name,
            avatarURL,
            email,
            username,
            grievances,
            comments,
            organizations,
            socialLinks,
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message:
                'Something is wrong with your authorization, please sign in again.',
        });
    }
};

module.exports = auth;
