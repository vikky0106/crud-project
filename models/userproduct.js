'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserProducts = sequelize.define('userProduct', {
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            }
        }
    });

    return UserProducts;
};
