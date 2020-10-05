'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('role', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            slug: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            description: {
                type: Sequelize.STRING,
                required: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('role');
    }
};
