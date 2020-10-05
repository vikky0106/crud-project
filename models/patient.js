'use strict';
module.exports = (sequelize, DataTypes) => {
    var Patient = sequelize.define('patient', {
        firstName: {
            type: DataTypes.STRING,
            required: true
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING
        },
        contactNumber: {
            type: DataTypes.BIGINT
        },
        doctor: {
            type: DataTypes.INTEGER,
            required: true
        },
        doctorFeedback: {
            type: DataTypes.STRING
        },
        report: {
            type: DataTypes.STRING,
            required: true
        }
    });

    Patient.associate = function (models) {
        Patient.belongsTo(models.user, {
            foreignKey: 'doctor',
            targetKey: 'id'
        });
    };

    return Patient;
};
