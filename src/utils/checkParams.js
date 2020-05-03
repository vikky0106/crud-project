'use-strict';

const _ = require('lodash');

/**
 * Function validate required params.
 * @param {arayr} arr Array of required params
 * @param {object} params body, query or path params
 * @returns {object} object with status and message
 */
module.exports.checkParams = function (arr, params) {
    const result = { fail: false, msg: '' };
    _.map(arr, (val) => {
        if (!_.has(params, val)) {
            result.fail = true;
            result.msg = val + ' is required.';
        }
    });
    return result;
};
