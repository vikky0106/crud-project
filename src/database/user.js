'use-strict';

const User = require('../../models').user;
const UserRole = require('../../models').userRole;
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
        const user = await User.create(bodyData);
        await UserRole.create({
            userId: user.id,
            roleId: bodyData.role
        });
        return Promise.resolve(user);
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
exports.getUsers = async (data) => {
    try {
        const users = await User.findAll();
        return Promise.resolve(users);
    } catch (error) {
        console.log('Error while assigining product in database', error);
        return Promise.reject(error);
    }
};
