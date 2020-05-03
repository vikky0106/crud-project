'use strict';

/**
 * Function construct username from user object.
 * @param {object} user user object
 * @returns {string} username
 */
module.exports.getUserName = function (user) {
    let username = '';
    if (user && user.firstName) {
        username = `${user.firstName} ${user.lastName ? user.lastName : ''}`;
    } else if (user && user.email) {
        username = user.email;
    }
    return username;
};
