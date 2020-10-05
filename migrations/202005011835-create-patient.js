'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('patient', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
                required: true
            },
            lastName: {
                type: Sequelize.STRING,
                required: true
            },
            email: {
                type: Sequelize.STRING
            },
            contactNumber: {
                type: Sequelize.BIGINT
            },
            doctor: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                required: true,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            report: {
                type: Sequelize.STRING,
                required: true
            },
            doctorFeedback: {
                type: Sequelize.STRING,
                required: false
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
        return queryInterface.dropTable('patient');
    }
};
