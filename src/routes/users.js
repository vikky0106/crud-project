'use strict';
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controller/users');
const { verifyUser } = require('../middleware/verifyuser');

router.get('/', verifyUser, getUsers);

module.exports = (app) => {
    app.use('/api/v1/users', router);
};
