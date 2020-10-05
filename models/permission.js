'use strict';

module.exports = (sequelize, DataTypes) => {
    var Permission = sequelize.define('permission', {
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
    Permission.associate = function (models) {
        Permission.belongsToMany(models.role, {
            through: 'rolePermission',
            foreignKey: 'roleId'
        });
    };
    return Permission;
};
