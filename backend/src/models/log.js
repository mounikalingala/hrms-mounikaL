const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Log', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        orgId: { type: DataTypes.INTEGER },
        userId: { type: DataTypes.INTEGER, allowNull: true },
        action: { type: DataTypes.STRING },
        details: { type: DataTypes.JSONB }
    }, {
        tableName: 'logs',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    });
};
