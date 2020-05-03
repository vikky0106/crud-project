'use strict';
const { errorHandler } = require('../utils/errorHandler');
const { decodeJwtToken } = require('../utils/jwt');
const constants = require('../utils/constants');
const { getUserDetails } = require('../database/user');

/**
 * Verify user token.
 * @param {Number} req req object
 * @param {Number} res res object
 * @param {function} next call next handler
 * @returns {object} returns error response if fails or return to next handler.
 */
exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(constants.STATUS_CODES.UNAUTHORIZED_STATUS).json({
                error: constants.CODES.UNAUTHORIZED,
                message: constants.MESSAGES.UNAUTHORIZED
            });
        }
        const docoded = decodeJwtToken(token);
        if (docoded && docoded.userId) {
            req.headers.userId = docoded.userId;
            const userDetials = await getUserDetails(
                {
                    id: docoded.userId
                },
                ['id']
            );
            if (userDetials) {
                return next();
            }
        }
        return res.status(constants.STATUS_CODES.UNAUTHORIZED_STATUS).json({
            error: constants.CODES.UNAUTHORIZED,
            message: constants.MESSAGES.UNAUTHORIZED
        });
    } catch (error) {
        console.log('Error in verifying users', error);
        if (
            error &&
            error.name &&
            [
                'JsonWebTokenError',
                'TokenExpiredError',
                'NotBeforeError'
            ].indexOf(error.name) > -1
        ) {
            return res.status(constants.STATUS_CODES.UNAUTHORIZED_STATUS).json({
                error: constants.CODES.UNAUTHORIZED,
                message: error.message
            });
        }
        errorHandler(res, error);
    }
};
