const { Organization } = require('../models/organization.js');

const getOrg = async (req, res) => {
    const org = await Organization.findByPk(req.user.orgId);
    res.json(org);
};

module.exports = { getOrg };
