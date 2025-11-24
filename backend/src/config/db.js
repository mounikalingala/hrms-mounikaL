// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const dialect = process.env.DB_DIALECT || 'sqlite';

// let sequelize;
// if (dialect === 'sqlite') {
//     sequelize = new Sequelize({
//         dialect: 'sqlite',
//         storage: './database.sqlite',
//         logging: false
//     });
// } else {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: dialect,
//         logging: false,
//     });
// }

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: dialect,
            logging: false,
        }
    );
}

/** 
 * 🔥 Test DB connection + sync models
 */
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        await sequelize.sync();
        console.log("✅ Database synced");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
}

// Run connection test
connectDB();

module.exports = sequelize;
