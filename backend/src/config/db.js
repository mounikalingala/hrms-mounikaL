// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const dialect = process.env.DATABASE_URL || 'sqlite';

// let sequelize;

// if (dialect === 'sqlite') {
//     sequelize = new Sequelize({
//         dialect: 'sqlite',
//         storage: './database.sqlite',
//         logging: false
//     });
// } else {
//     sequelize = new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//         {
//             host: process.env.DB_HOST,
//             port: process.env.DB_PORT,
//             dialect: dialect,
//             logging: false,
//         }
//     );
// }

// /** 
//  * 🔥 Test DB connection + sync models
//  */
// async function connectDB() {
//     try {
//         await sequelize.authenticate();
//         console.log(" Database connected");

//         await sequelize.sync();
//         console.log(" Database synced");
//     } catch (error) {
//         console.error("Database connection failed:", error);
//     }
// }

// // Run connection test
// connectDB();

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
    // ⭐ Render Deployment (PostgreSQL)
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Render needs this
            },
        },
    });
} else {
    // ⭐ Local Development (SQLite or PostgreSQL based on your setup)
    const dialect = process.env.DB_DIALECT || 'sqlite';

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
}

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

connectDB();

module.exports = sequelize;
