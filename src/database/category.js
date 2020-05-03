'use-strict';

const Category = require('../../models').category;

/**
 * Function save category information in database.
 * @param  {Object} bodyData Json object contains user data.
 * @returns {Promise} data
 */
exports.saveCategory = async (bodyData) => {
    try {
        await Category.create(bodyData);
        return Promise.resolve();
    } catch (error) {
        console.log('Error while saving category in database', error);
        return Promise.reject(error);
    }
};

/**
 * Function to fetch categories information from database.
 * @param  {Object} filter Json object contains filter.
 * @param  {Number} page page Number.
 * @param  {Number} limit records limit.
 * @returns {Promise} data
 */
exports.fetchCategories = async (filter = {}, page, limit) => {
    try {
        let offset = 0;
        if (page && limit) {
            limit = Number(limit);
            page = Number(page);
            offset = (page - 1) * limit;
        }
        const results = await Category.findAndCountAll({
            where: filter,
            limit,
            offset,
            order: [['id', 'ASC']]
        });
        return Promise.resolve(results);
    } catch (error) {
        console.log('Error while fetching categories from database', error);
        return Promise.reject(error);
    }
};
