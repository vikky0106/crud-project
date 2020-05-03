'use-strict';

const Product = require('../../models').product;
const User = require('../../models').user;
const Category = require('../../models').category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * Function to fetch products information from database.
 * @param  {Object} filter Json object contains filter.
 * @param  {Number} page page Number.
 * @param  {Number} limit records limit.
 * @returns {Promise} date retrived from database.
 */
exports.fetchProducts = async (filter = {}, page, limit) => {
    try {
        let offset = 0;
        if (page && limit) {
            limit = Number(limit);
            page = Number(page);
            offset = (page - 1) * limit;
        }
        const userProductFilter = {};
        let productFilter = {};
        const categoryFilter = {};

        if (filter.searchText) {
            const searchText = filter.searchText
                .replace(/[+*?()[\]]/g, '')
                .trim();
            productFilter = {
                [Op.or]: [
                    {
                        productName: {
                            [Op.substring]: searchText
                        }
                    },
                    {
                        '$category.categoryName$': {
                            [Op.substring]: searchText
                        }
                    },
                    {
                        '$users.firstName$': {
                            [Op.substring]: searchText
                        }
                    },
                    {
                        '$users.lastName$': {
                            [Op.substring]: searchText
                        }
                    }
                ]
            };
        }
        /**
         * Pass userId in filter object if want to retrive for user
         */
        if (filter.userId) {
            userProductFilter.userId = filter.userId;
        }
        if (filter.productCategory) {
            categoryFilter.categoryName = filter.productCategory;
        }

        const results = await Product.findAndCountAll({
            subQuery: false,
            where: productFilter,
            limit,
            offset,
            include: [
                {
                    model: Category,
                    where: categoryFilter,
                    required: true,
                    attributes: ['categoryName']
                },
                {
                    model: User,
                    through: {
                        where: userProductFilter,
                        required: true,
                        attributes: []
                    },
                    required: true,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            distinct: true,
            order: [['createdAt', 'DESC']]
        });
        return Promise.resolve(results);
    } catch (error) {
        console.log('Error while fetching products from database', error);
        return Promise.reject(error);
    }
};

/**
 * Function save product information in database.
 * @param  {Object} bodyData Json object contains product data.
 * @returns {Promise} data
 */
exports.saveProduct = async (bodyData) => {
    try {
        await Product.create(bodyData);
        return Promise.resolve();
    } catch (error) {
        console.log('Error while saving user in database', error);
        return Promise.reject(error);
    }
};

/**
 * Function update product based on the filter provided.
 * @param  {Object} filter Json object contains filter data.
 * @param  {Object} bodyData Json object contains data which need to update.
 * @returns {Promise} This function returns promise.
 */
exports.updateProductDetails = async (filter, bodyData) => {
    try {
        const result = await Product.update(bodyData, {
            where: filter
        });
        return Promise.resolve(result);
    } catch (error) {
        console.log(
            'Error while updating product information in database',
            error
        );
        return Promise.reject(error);
    }
};

/**
 * Delete product from database.
 * @param {object} filter Json object containing filter
 * @return {promise} This function returns promise.
 */
exports.removeProduct = async (filter) => {
    try {
        const result = await Product.destroy({
            where: filter
        });
        return Promise.resolve(result);
    } catch (error) {
        console.log('Error while deleting product in database', error);
        return Promise.reject(error);
    }
};
