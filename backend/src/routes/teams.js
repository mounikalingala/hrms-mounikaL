const express = require('express');
const { listTeams, createTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', listTeams);
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
