'use strict';

const constants = require('./constants');

/**
 * Handle error.
 * @param  {object} res response object
 * @param  {object} error error object
 * @returns {res} Error response in json
 */
module.exports.errorHandler = function (res, error) {
    let message = constants.MESSAGES.INTERNAL_SERVER_ERROR;
    let code = constants.CODES.INTERNAL_SERVER_ERROR;
    let statusCode = constants.STATUS_CODES.INTERNAL_SERVER_ERROR_STATUS;

    if (error.statusCode) {
        statusCode = error.statusCode;
        if (error.statusCode === 403) {
            code = constants.CODES.FORBIDDEN;
        } else if (error.statusCode === 400) {
            code = constants.CODES.BAD_REQUEST;
        } else if (error.statusCode === 401) {
            code = constants.CODES.UNAUTHORIZED;
        }
        if (error.code) {
            code = error.code;
        }
        message = error.message;
        console.error('Error while API call', message);
        return res.status(statusCode).json({
            message,
            code
        });
    } else {
        const message = error.message;
        console.error('Error while API call', message);
        return res.status(statusCode).json({
            message,
            code
        });
    }
};
