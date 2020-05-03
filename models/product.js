'use strict';

module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('product', {
        productName: {
            type: DataTypes.STRING,
            required: true
        },
        productCode: {
            type: DataTypes.STRING
        }
    });
    Product.associate = function (models) {
        Product.belongsTo(models.category, {
            foreignKey: 'categoryId',
            targetKey: 'id'
        });
        Product.belongsToMany(models.user, {
            through: 'userProduct',
            foreignKey: 'productId'
        });
    };
    return Product;
};
