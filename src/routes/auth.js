'use strict';
const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    sendResetPasswordEmail,
    updateResetPassword
} = require('../controller/auth');
const { verifyUser } = require('../middleware/verifyuser');

router.post('/signup', signup);
router.post('/login', login);
router.post('/resetpassword', verifyUser, sendResetPasswordEmail);
router.patch('/resetpassword', verifyUser, updateResetPassword);

module.exports = (app) => {
    app.use('/api/v1/auth', router);
};
