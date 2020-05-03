'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line no-path-concat
const config = require(__dirname + '/../config/dbconfig.js')[env];
const db = {};
const database = process.env.DATABASE || config.database;
const username = process.env.DB_USERNAME || config.username;
const password = process.env.DB_PASSWORD || config.password;
const dbHost = process.env.DB_HOST || config.host;
const dialect = config.dialect || 'mysql';
const dbPort = process.env.DB_PORT || config.port;

const sequelize = new Sequelize(database, username, password, {
    host: dbHost,
    port: dbPort,
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: true
    }
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
