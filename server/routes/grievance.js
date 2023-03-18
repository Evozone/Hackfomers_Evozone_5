const express = require('express');
const router = express.Router();

const {
    createGrievance,
    getGrievance,
    getAllGrievances,
    checkGrievance,
} = require('../controllers/grievance.js');

const auth = require('../middleware/auth.js');

router.get('/', getAllGrievances);
router.get('/:id', getGrievance);
router.post('/create', createGrievance);
router.post('/check', checkGrievance);
module.exports = router;
