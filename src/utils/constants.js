'use strict';
module.exports = {
    STATUS_CODES: {
        INTERNAL_SERVER_ERROR_STATUS: 500,
        BAD_REQUEST_ERROR_STATUS: 400,
        FORBIDDEN_ERROR_STATUS: 403,
        UNAUTHORIZED_STATUS: 401,
        SUCCESS_STATUS: 200,
        NO_CONTENT_STATUS: 204,
        CREATED_STATUS: 201,
        CONFLICT_ERROR_STATUS: 409
    },
    CODES: {
        BAD_REQUEST: 'BAD_REQUEST',
        USER_NOT_FOUND: 'USER_NOT_FOUND',
        FORBIDDEN: 'FORBIDDEN',
        UNAUTHORIZED: 'UNAUTHORIZED',
        INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
        CONFLICT: 'CONFLICT'
    },
    MESSAGES: {
        LOGIN_FAIED: 'Invalid email and password',
        EMAIL_EXIST: 'Email already exist',
        USER_NOT_FOUND: 'User not found',
        UNAUTHORIZED: 'You are not authorized to perform this operation',
        PASSWORD_MISMATCH: 'Passoword and confirm password does not match',
        INVALD_TOKEN: 'Invalid reset password token'
    },
    JWT: {
        EXPIRY_TIME: '1h',
        JWT_SECRET: process.env.JWT_SECRET_KEY || 'jwtsecretkey'
    }
};
