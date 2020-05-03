'use strict';
const constants = require('../utils/constants');
const { checkParams } = require('../utils/checkParams');
const { errorHandler } = require('../utils/errorHandler');
const {
    saveProduct,
    fetchProducts,
    updateProductDetails,
    removeProduct
} = require('../database/product');
const { getUserName } = require('../utils/common');

/**
 * Controller for product list with filter and search.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.getProducts = async (req, res) => {
    try {
        /* Check required paramerter
           WE can also use JOI module for advance validation
        */
        const query = req.query || {};
        const arr = ['page', 'limit'];
        const check = checkParams(arr, query);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        const { page, limit, searchText, productCategory } = query;

        const results = await fetchProducts(
            {
                searchText,
                productCategory
            },
            page,
            limit
        );
        if (results && results.rows && results.rows.length) {
            results.rows.forEach((row) => {
                row = row.dataValues;
                if (row.users && row.users.length) {
                    row.users.forEach((user) => {
                        user.dataValues.userName = getUserName(user);
                    });
                }
                row.categoryName = row.category.categoryName;
                row.category = undefined;
            });
            return res
                .status(constants.STATUS_CODES.SUCCESS_STATUS)
                .json(results);
        } else {
            return res.status(constants.STATUS_CODES.NO_CONTENT_STATUS).json();
        }
    } catch (error) {
        console.log('Error while getting products', error);
        return res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Controller for create product.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.createProduct = async (req, res) => {
    try {
        /* Check required paramerter
            WE can also use JOI module for advance validation
        */
        const body = req.body || {};
        const arr = ['productName', 'productCode', 'categoryId'];
        const check = checkParams(arr, body);
        if (check.fail) {
            return res
                .status(constants.STATUS_CODES.BAD_REQUEST_ERROR_STATUS)
                .json({
                    error: constants.CODES.BAD_REQUEST,
                    message: check.msg
                });
        }
        await saveProduct(body);
        return res.status(constants.STATUS_CODES.CREATED_STATUS).json({});
    } catch (error) {
        console.log('Error in createProduct Controller', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for update product.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.updateProduct = async (req, res) => {
    try {
        const data = req.body;
        const filter = {
            id: req.params.productId
        };
        const result = await updateProductDetails(filter, data);
        if (result) {
            return res.status(201).json();
        } else {
            return res.status(404).json();
        }
    } catch (error) {
        console.log('Error while updating product', error);
        errorHandler(res, error);
    }
};

/**
 * Controller for deete product.
 * @param {object} req req object
 * @param {object} res res object
 * @return {res} JSON response.
 */
exports.deleteProduct = async (req, res) => {
    try {
        const filter = {
            id: req.params.productId
        };
        const result = await removeProduct(filter);
        if (result) {
            return res.status(204).json();
        } else {
            return res.status(404).json();
        }
    } catch (error) {
        console.log('Error while deleting user', error);
        return res.status(500).json({
            message: error.message
        });
    }
};
