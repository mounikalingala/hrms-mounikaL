const { Employee, Team, EmployeeTeam } = require('../models');
const { writeLog } = require('../middleware/logger');

const listEmployees = async (req, res) => {
    const employees = await Employee.findAll({
        where: { orgId: req.user.orgId },
        include: [{ model: Team, through: { attributes: [] } }]
    });
    res.json(employees);
};

const createEmployee = async (req, res) => {
    const { firstName, lastName, email, position, phone } = req.body;
    const employee = await Employee.create({ orgId: req.user.orgId, firstName, lastName, email, position, phone });
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'EMP_CREATE', details: { employeeId: employee.id } });
    res.json(employee);
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findOne({ where: { id, orgId: req.user.orgId } });
    if (!employee) return res.status(404).json({ error: 'Not found' });
    await employee.update(req.body);
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'EMP_UPDATE', details: { employeeId: id } });
    res.json(employee);
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findOne({ where: { id, orgId: req.user.orgId } });
    if (!employee) return res.status(404).json({ error: 'Not found' });
    await employee.destroy();
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'EMP_DELETE', details: { employeeId: id } });
    res.json({ ok: true });
};

const assignToTeam = async (req, res) => {
    const { employeeId, teamId } = req.body;
    // ensure both exist in org
    const emp = await Employee.findOne({ where: { id: employeeId, orgId: req.user.orgId } });
    const team = await Team.findOne({ where: { id: teamId, orgId: req.user.orgId } });
    if (!emp || !team) return res.status(404).json({ error: 'Employee or Team not found' });

    await EmployeeTeam.findOrCreate({ where: { employeeId, teamId } });
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'EMP_ASSIGN', details: { employeeId, teamId } });
    res.json({ ok: true });
};

const removeFromTeam = async (req, res) => {
    const { employeeId, teamId } = req.body;
    await EmployeeTeam.destroy({ where: { employeeId, teamId } });
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'EMP_UNASSIGN', details: { employeeId, teamId } });
    res.json({ ok: true });
};

module.exports = { listEmployees, createEmployee, updateEmployee, deleteEmployee, assignToTeam, removeFromTeam };
