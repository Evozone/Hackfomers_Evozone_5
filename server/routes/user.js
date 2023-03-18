const express = require('express');
const router = express.Router();

const {
    googleSignUp,
    editProfile,
    joinOrg,
} = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

router.post('/googleSignUp', googleSignUp);
router.post('/joinOrg', joinOrg);
router.patch('/edit', auth, editProfile);
module.exports = router;
