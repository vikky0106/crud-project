'use-strict';

const Patient = require('../../models').patient;
/**
 * Function save user information in database.
 * @param  {Object} bodyData Json object contains user data.
 * @returns {Promise} data
 */
exports.saveReport = async (bodyData) => {
    try {
        const patient = await Patient.create(bodyData);
        return Promise.resolve(patient);
    } catch (error) {
        console.log('Error while saving report in database', error);
        return Promise.reject(error);
    }
};

/**
 * Get users
 * @param  {Object} data Json object contains mapping data.
 * @returns {Promise} data
 */
exports.getReports = async (data) => {
    try {
        const reports = await Patient.findAll();
        return Promise.resolve(reports);
    } catch (error) {
        console.log('Error while getting reports from database', error);
        return Promise.reject(error);
    }
};
