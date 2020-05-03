'use strict';

const database = process.env.DATABASE || 'test-task-db';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || 'root';
const host = process.env.DB_HOST || 'localhost';
const dialect = 'mysql';
const port = process.env.DB_PORT || 3306;

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        port,
        dialect
    },
    test: {
        username,
        password,
        database,
        host,
        port,
        dialect
    },
    production: {
        username,
        password,
        database,
        host,
        port,
        dialect
    }
};
