'use strict';
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const { verifyUser } = require('../middleware/verifyuser');

router.post('/', verifyUser, categoryController.createCategory);

router.get('/', verifyUser, categoryController.getCategories);

module.exports = (app) => {
    app.use('/api/v1/categories', router);
};
