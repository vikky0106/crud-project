'use strict';
const constants = require('../utils/constants');
const { errorHandler } = require('../utils/errorHandler');
const { getRoles } = require('../database/role');

/**
 * Controller for assing product to user.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.getRoles = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const resData = await getRoles();
        return res
            .status(constants.STATUS_CODES.SUCCESS_STATUS)
            .json({ data: resData });
    } catch (error) {
        console.log('Error in assignProducts', error);
        errorHandler(res, error);
    }
};
