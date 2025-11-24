const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('EmployeeTeam', {
        employeeId: { type: DataTypes.INTEGER, primaryKey: true },
        teamId: { type: DataTypes.INTEGER, primaryKey: true }
    }, {
        tableName: 'employee_teams',
        timestamps: false,
        underscored: true
    });
};
