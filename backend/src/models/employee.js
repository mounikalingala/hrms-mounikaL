const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Employee', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        orgId: { type: DataTypes.INTEGER, allowNull: false },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        position: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        tableName: 'employees',
        underscored: true
    });
};
