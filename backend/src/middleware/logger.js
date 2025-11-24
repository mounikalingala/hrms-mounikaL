const { Log } = require('../models/log.js');
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: path.join(logDir, 'hrms.log') })
    ],
});

async function writeLog({ orgId, userId, action, details }) {
    try {
        // write to DB
        await Log.create({ orgId, userId, action, details });
    } catch (e) {
        // if DB write fails, keep going — we will at least write to file
    }
    logger.info({ orgId, userId, action, details });
}

module.exports = {
    writeLog
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm9yZ0lkIjoxLCJpYXQiOjE3NjM3Nzc1NTAsImV4cCI6MTc2MzgwNjM1MH0.V78wfa6ChUhXmbQltwwqET5WQIkmRvYdBoU6vxCOAhQ