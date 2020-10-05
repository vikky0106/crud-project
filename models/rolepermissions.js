'use strict';

module.exports = (sequelize, DataTypes) => {
    var RolePermission = sequelize.define('rolePermission', {
        permissionId: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER
    });
    RolePermission.associate = function (models) {};
    return RolePermission;
};
