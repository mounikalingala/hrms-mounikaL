const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Team', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        orgId: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT
    }, {
        tableName: 'teams',
        underscored: true
    });
};






