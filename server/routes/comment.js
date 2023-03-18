const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js');

const {
    createComment,
    getComment,
    getCommentsForGrievance,
} = require('../controllers/comment.js');

router.post('/create', createComment);
router.get('/:id', getComment);
router.get('/grievance/:id', getCommentsForGrievance);

module.exports = router;
