const express = require('express');
const { getOrg } = require('../controllers/orgController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getOrg);

module.exports = router;
