const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Organization = require('./organization')(sequelize);
const User = require('./user')(sequelize);
const Employee = require('./employee')(sequelize);
const Team = require('./team')(sequelize);
const EmployeeTeam = require('./employeeTeam')(sequelize);
const Log = require('./log')(sequelize);

// associations
Organization.hasMany(User, { foreignKey: 'orgId' });
User.belongsTo(Organization, { foreignKey: 'orgId' });

Organization.hasMany(Employee, { foreignKey: 'orgId' });
Employee.belongsTo(Organization, { foreignKey: 'orgId' });

Organization.hasMany(Team, { foreignKey: 'orgId' });
Team.belongsTo(Organization, { foreignKey: 'orgId' });

Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employeeId' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'teamId' });

Organization.hasMany(Log, { foreignKey: 'orgId' });
Log.belongsTo(Organization, { foreignKey: 'orgId' });

User.hasMany(Log, { foreignKey: 'userId' });
Log.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    Organization,
    User,
    Employee,
    Team,
    EmployeeTeam,
    Log
};
