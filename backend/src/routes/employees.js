const express = require('express');
const { listEmployees, createEmployee, updateEmployee, deleteEmployee, assignToTeam, removeFromTeam } = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', listEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

router.post('/assign', assignToTeam);
router.post('/unassign', removeFromTeam);

module.exports = router;
