const express = require('express');
const router = express.Router();

const {
    createGrievance,
    getGrievance,
    getAllGrievances,
    checkGrievance,
    voteGrievance,
    lastSevenDaysGrievance,
    // generateSummary,
} = require('../controllers/grievance.js');

const auth = require('../middleware/auth.js');

router.get('/lastSevenDaysGrievance/:locationFilter', lastSevenDaysGrievance);
// router.get('/generateSummary', generateSummary);
router.get('/', getAllGrievances);
router.get('/:id', getGrievance);
router.post('/create', createGrievance);
router.post('/check', checkGrievance);
router.patch('/vote', voteGrievance);

module.exports = router;
