'use strict';
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const { verifyUser } = require('../middleware/verifyuser');

router.post('/', verifyUser, productController.createProduct);

router.get('/', verifyUser, productController.getProducts);

router.put('/:productId', verifyUser, productController.updateProduct);

router.delete('/:productId', verifyUser, productController.deleteProduct);

module.exports = (app) => {
    app.use('/api/v1/products', router);
};
