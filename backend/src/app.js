const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const teamRoutes = require('./routes/teams');
const orgRoutes = require('./routes/org');

const app = express();
app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "https://hrms-mounikal.netlify.app"
        ],
        credentials: true
    }
));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/org', orgRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
