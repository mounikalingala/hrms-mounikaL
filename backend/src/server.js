const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await sequelize.sync({ alter: true }); // in production use migrations
        app.listen(PORT, () => console.log(`HRMS backend running on ${PORT}`));
    } catch (err) {
        console.error('Failed to start server', err);
    }
}

start();
