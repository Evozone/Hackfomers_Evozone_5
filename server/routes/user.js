const express = require('express');
const router = express.Router();

const { googleSignUp, editProfile } = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

router.post('/googleSignUp', googleSignUp);
router.patch('/edit', auth, editProfile);
module.exports = router;
