const { Team, Employee } = require('../models');
const { writeLog } = require('../middleware/logger');

const listTeams = async (req, res) => {
    const teams = await Team.findAll({
        include: [{ model: Employee, through: { attributes: [] } }]
    });
    res.json(teams);
};

const createTeam = async (req, res) => {
    const { name, description } = req.body;
    const team = await Team.create({ orgId: req.user.orgId, name, description });
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'TEAM_CREATE', details: { teamId: team.id } });
    res.json(team);
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id, orgId: req.user.orgId } });
    if (!team) return res.status(404).json({ error: 'Not found' });
    await team.update(req.body);
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'TEAM_UPDATE', details: { teamId: id } });
    res.json(team);
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id, orgId: req.user.orgId } });
    if (!team) return res.status(404).json({ error: 'Not found' });
    await team.destroy();
    await writeLog({ orgId: req.user.orgId, userId: req.user.id, action: 'TEAM_DELETE', details: { teamId: id } });
    res.json({ ok: true });
};

module.exports = { listTeams, createTeam, updateTeam, deleteTeam };
