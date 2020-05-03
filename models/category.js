'use strict';

module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('category', {
        categoryName: {
            type: DataTypes.STRING,
            required: true
        },
        categoryCode: {
            type: DataTypes.STRING
        }
    });
    Category.associate = function (models) {};
    return Category;
};
