'use strict';
const constants = require('../utils/constants');
const { checkParams } = require('../utils/checkParams');
const { errorHandler } = require('../utils/errorHandler');
const { assignProduct } = require('../database/user');

/**
 * Controller for assing product to user.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.assignProducts = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const data = req.params || {};
        const arr = ['userId', 'productId'];
        const check = checkParams(arr, data);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        await assignProduct(data);
        return res.status(constants.STATUS_CODES.CREATED_STATUS).json({});
    } catch (error) {
        console.log('Error in assignProducts', error);
        errorHandler(res, error);
    }
};
