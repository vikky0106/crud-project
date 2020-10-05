'use strict';
const Crypto = require('crypto');
const constants = require('../utils/constants');
const { checkParams } = require('../utils/checkParams');
const { errorHandler } = require('../utils/errorHandler');
const { saveUser, getUserDetails } = require('../database/user');
const { generateJwtToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');

/**
 * Controller for user signup.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.signup = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const body = req.body || {};
        const arr = ['email', 'password', 'firstName', 'role'];
        const check = checkParams(arr, body);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        const userDetails = await getUserDetails(
            {
                email: body.email
            },
            ['email']
        );
        if (userDetails) {
            return res
                .status(constants.STATUS_CODES.CONFLICT_ERROR_STATUS)
                .json({
                    error: constants.CODES.CONFLICT,
                    message: constants.MESSAGES.EMAIL_EXIST
                });
        }
        const data = await saveUser(body);
        return res.status(constants.STATUS_CODES.CREATED_STATUS).json(data);
    } catch (error) {
        console.log('Error in signup APIs', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for user login.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.login = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const arr = ['email', 'password'];
        const check = checkParams(arr, req.body);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        const { email, password } = req.body || {};

        const userDetails = await getUserDetails(
            {
                email
            },
            ['id', 'password', 'salt']
        );

        if (!userDetails || !userDetails.authenticate(password)) {
            return res.status(constants.STATUS_CODES.UNAUTHORIZED_STATUS).json({
                error: constants.CODES.UNAUTHORIZED,
                message: constants.MESSAGES.LOGIN_FAIED
            });
        }
        const token = generateJwtToken({
            userId: userDetails.id
        });
        userDetails.password = undefined;
        userDetails.salt = undefined;
        res.header('Authorization', token);
        return res
            .status(constants.STATUS_CODES.SUCCESS_STATUS)
            .json(userDetails);
    } catch (error) {
        console.log('Error in login APIs', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for send reset password email.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.sendResetPasswordEmail = async (req, res) => {
    try {
        const userId = req.headers.userId;

        const userDetails = await getUserDetails(
            {
                id: userId
            },
            ['id', 'email']
        );

        const resetToken = Crypto.randomBytes(7).toString('hex');
        userDetails.resetPasswordToken = resetToken;
        await userDetails.save();
        var to = userDetails.email;
        var subject = 'Password Reset Request';
        var mailbody = `You are receiving this because a password 
            reset was requested for your account.\n\n
            Please use this token to reset your password 
            ${resetToken} \n\n 
            If you did not request this, please ignore this email 
            and your password will remain unchanged.\n`;

        /**
         * WE can send email in asynchronous manner,
         * For now I am doing it synchronously to return preview URL.
         */
        const previewUrl = await sendEmail(to, subject, mailbody);
        return res.status(constants.STATUS_CODES.SUCCESS_STATUS).json({
            previewUrl
        });
    } catch (error) {
        console.log('Error in sendResetPasswordEmail API', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for update new password after validating token.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.updateResetPassword = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const userId = req.headers.userId;
        const arr = ['resetPasswordToken', 'newPassword', 'confirmPassword'];
        const check = checkParams(arr, req.body);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        const { resetPasswordToken, newPassword, confirmPassword } =
            req.body || {};

        if (newPassword !== confirmPassword) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: constants.MESSAGES.PASSWORD_MISMATCH
                });
        }

        const userDetails = await getUserDetails(
            {
                resetPasswordToken,
                id: userId
            },
            ['id']
        );

        if (!userDetails) {
            return res
                .status(constants.STATUS_CODES.FORBIDDEN_ERROR_STATUS)
                .json({
                    error: constants.CODES.FORBIDDEN,
                    message: constants.MESSAGES.INVALD_TOKEN
                });
        }
        userDetails.resetPasswordToken = '';
        userDetails.password = newPassword;
        await userDetails.save();
        return res.status(constants.STATUS_CODES.CREATED_STATUS).json({});
    } catch (error) {
        console.log('Error in reset password API', error);
        errorHandler(res, error);
    }
};
