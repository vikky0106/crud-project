'use-strict';

const jwt = require('jsonwebtoken');
const { EXPIRY_TIME, JWT_SECRET } = require('../utils/constants').JWT;

/**
 * Generate Jwt token.
 * @param {object} data jwt payload data.
 * @returns {string} generated token.
 */
module.exports.generateJwtToken = function (data = {}) {
    return jwt.sign(data, JWT_SECRET, {
        expiresIn: EXPIRY_TIME
    });
};

/**
 * Decode Jwt token.
 * @param {string} token token passed by user.
 * @returns {object} decoded payload data.
 */
module.exports.decodeJwtToken = function (token) {
    return jwt.verify(token, JWT_SECRET);
};
