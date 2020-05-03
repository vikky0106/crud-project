'use strict';
const Crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('user', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        salt: {
            type: DataTypes.STRING,
            required: true
        },
        resetPasswordToken: {
            type: DataTypes.STRING
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.product, {
            through: 'userProduct',
            foreignKey: 'userId'
        });
    };

    /**
     * Function get hash for the password using salt.
     * @param {String} password res object
     * @return {String} password hash.
     */
    User.prototype.hashPassword = function (password) {
        if (this.salt && password) {
            return Crypto.pbkdf2Sync(
                password,
                Buffer.from(this.salt, 'base64'),
                10000,
                64,
                'sha512'
            ).toString('base64');
        } else {
            return password;
        }
    };

    /**
     * Match user password with database.
     * @param {String} password res object
     * @return {boolean} boolean value true if password valid otherwise false.
     */
    User.prototype.authenticate = function (password) {
        return this.password === this.hashPassword(password);
    };

    User.beforeSave(function (model) {
        if (model.password) {
            model.salt = Crypto.randomBytes(16).toString('base64');
            model.password = model.hashPassword(model.password);
        }
    });

    return User;
};
