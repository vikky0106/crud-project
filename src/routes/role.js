'use strict';
const express = require('express');
const router = express.Router();
const { getRoles } = require('../controller/roles');
const { verifyUser } = require('../middleware/verifyuser');

router.get('/', verifyUser, getRoles);

module.exports = (app) => {
    app.use('/api/v1/roles', router);
};
