'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserRole = sequelize.define('userRole', {
        userId: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER
    });
    UserRole.associate = function (models) {};
    return UserRole;
};
