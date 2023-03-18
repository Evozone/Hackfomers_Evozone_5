const express = require('express');
const router = express.Router();

const { createOrg, getOrg, getAllOrgs } = require('../controllers/org.js');

router.get('/', getAllOrgs);
router.get('/:id', getOrg);
router.post('/create', createOrg);
module.exports = router;
