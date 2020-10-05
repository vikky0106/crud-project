'use-strict';
const Role = require('../../models').role;

/**
 * Function save user information in database.
 * @param  {Object} bodyData Json object contains user data.
 * @returns {Promise} data
 */
exports.saveRole = async (bodyData) => {
    try {
        await Role.create(bodyData);
        return Promise.resolve();
    } catch (error) {
        console.log('Error while saving role in database', error);
        return Promise.reject(error);
    }
};

/**
 * Assign product to user.
 * @param  {Object} data Json object contains mapping data.
 * @returns {Promise} data
 */
exports.getRoles = async (data) => {
    try {
        const roles = await Role.findAll();
        return Promise.resolve(roles);
    } catch (error) {
        console.log('Error while getting roles from database', error);
        return Promise.reject(error);
    }
};
