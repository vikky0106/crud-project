'use strict';
const express = require('express');
const router = express.Router();
const { assignProducts } = require('../controller/users');
const { verifyUser } = require('../middleware/verifyuser');

router.patch('/:userId/products/:productId', verifyUser, assignProducts);

module.exports = (app) => {
    app.use('/api/v1/users', router);
};
