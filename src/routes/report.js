'use strict';
const express = require('express');
const router = express.Router();
const { addReport, getReports } = require('../controller/report');
const { verifyUser } = require('../middleware/verifyuser');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/', verifyUser, upload.single('report'), addReport);

router.get('/', verifyUser, getReports);

module.exports = (app) => {
    app.use('/api/v1/reports', router);
};
