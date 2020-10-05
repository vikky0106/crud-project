'use strict';

module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('role', {
        slug: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            required: true
        }
    });
    Role.associate = function (models) {
        Role.belongsToMany(models.user, {
            through: 'userRole',
            foreignKey: 'userId'
        });
        Role.belongsToMany(models.permission, {
            through: 'rolePermission',
            foreignKey: 'permissionId'
        });
    };
    return Role;
};
