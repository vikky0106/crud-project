'use strict';
const constants = require('../utils/constants');
const { checkParams } = require('../utils/checkParams');
const { errorHandler } = require('../utils/errorHandler');
const { saveCategory, fetchCategories } = require('../database/category');

/**
 * Controller for create category.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.createCategory = async (req, res) => {
    try {
        /* Check required paramerter
           WE can also use JOI module for advance validation
        */
        const body = req.body || {};
        const arr = ['categoryName', 'categoryCode'];
        const check = checkParams(arr, body);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        await saveCategory(body);
        return res.status(constants.STATUS_CODES.CREATED_STATUS).json({});
    } catch (error) {
        console.log('Error in showing categories list', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for categories list
 * @param {object} req req object
 * @param {object} res res object
 * @return {object} JSON response.
 */
exports.getCategories = async (req, res) => {
    try {
        /* Check required paramerter
           WE can also use JOI module for advance validation
        */
        const query = req.query || {};
        const arr = ['page', 'limit'];
        const check = checkParams(arr, query);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        const { page, limit } = query;
        const results = await fetchCategories({}, page, limit);
        if (results && results.rows && results.rows.length) {
            return res
                .status(constants.STATUS_CODES.SUCCESS_STATUS)
                .json(results);
        } else {
            return res.status(constants.STATUS_CODES.NO_CONTENT_STATUS).json();
        }
    } catch (error) {
        console.log('Error in create category APIs', error);
        errorHandler(res, error);
    }
};
