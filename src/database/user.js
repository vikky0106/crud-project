'use-strict';

const User = require('../../models').user;
const constants = require('../utils/constants');
/**
 * Function get user details from database based on the filter provided.
 * @param {Object} filter Json object contains filter data.
 * @param {array} attributes Array of fields to fetch them from database.
 * @returns {Promise} data
 */
exports.getUserDetails = async (filter = {}, attributes = []) => {
    try {
        const details = await User.findOne({
            where: filter,
            attributes
        });
        return Promise.resolve(details);
    } catch (error) {
        console.log('Error while getting user details from database', error);
        return Promise.reject(error);
    }
};

/**
 * Function save user information in database.
 * @param  {Object} bodyData Json object contains user data.
 * @returns {Promise} data
 */
exports.saveUser = async (bodyData) => {
    try {
        await User.create(bodyData);
        return Promise.resolve();
    } catch (error) {
        console.log('Error while saving user in database', error);
        return Promise.reject(error);
    }
};

/**
 * Assign product to user.
 * @param  {Object} data Json object contains mapping data.
 * @returns {Promise} data
 */
exports.assignProduct = async (data) => {
    try {
        const userDetails = await this.getUserDetails(
            { id: Number(data.userId) },
            ['id']
        );
        if (!userDetails) {
            return Promise.reject(
                new Error({
                    statusCode: 404,
                    code: constants.CODES.USER_NOT_FOUND,
                    message: constants.MESSAGES.USER_NOT_FOUND
                })
            );
        }
        await userDetails.addProducts(Number(data.productId));
        return Promise.resolve();
    } catch (error) {
        console.log('Error while assigining product in database', error);
        return Promise.reject(error);
    }
};
