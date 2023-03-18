const express = require('express');
const router = express.Router();

const { createOrg, getOrg, getAllOrgs } = require('../controllers/org.js');

router.post('/create', createOrg);
router.get('/:id', getOrg);
router.get('/', getAllOrgs);
module.exports = router;
