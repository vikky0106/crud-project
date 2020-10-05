'use strict';
const constants = require('../utils/constants');
const { errorHandler } = require('../utils/errorHandler');
const { getReports, saveReport } = require('../database/report');

/**
 * Controller for assing product to user.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.getReports = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const resData = await getReports();
        return res
            .status(constants.STATUS_CODES.SUCCESS_STATUS)
            .json({ data: resData });
    } catch (error) {
        console.log('Error in get reports', error);
        errorHandler(res, error);
    }
};

exports.addReport = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const data = { ...req.body };
        delete data.report;
        const resData = await saveReport(data);
        return res
            .status(constants.STATUS_CODES.CREATED_STATUS)
            .json({ data: resData });
    } catch (error) {
        console.log('Error in add report', error);
        errorHandler(res, error);
    }
};
