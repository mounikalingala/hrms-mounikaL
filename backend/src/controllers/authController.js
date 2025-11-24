const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organization, User } = require('../models');
const { writeLog } = require('../middleware/logger');
require('dotenv').config();

const registerOrg = async (req, res) => {
    try {
        const { orgName, name, email, password } = req.body;
        if (!orgName || !email || !password) return res.status(400).json({ error: 'Missing fields' });

        const org = await Organization.create({ name: orgName });
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ orgId: org.id, name, email, passwordHash: hash, role: 'admin' });

        await writeLog({ orgId: org.id, userId: user.id, action: 'ORG_CREATE', details: { orgId: org.id } });

        const token = jwt.sign({ userId: user.id, orgId: org.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id, orgId: user.orgId }, process.env.JWT_SECRET, { expiresIn: '8h' });

        await writeLog({ orgId: user.orgId, userId: user.id, action: 'USER_LOGIN', details: { userId: user.id } });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const logout = async (req, res) => {
    // For stateless JWT, logout is best-effort client-side. Still log logout event.
    try {
        const user = req.user;
        await writeLog({ orgId: user.orgId, userId: user.id, action: 'USER_LOGOUT', details: { userId: user.id } });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerOrg, login, logout };
