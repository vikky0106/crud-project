'use strict';

const database = process.env.DATABASE || 'local-dev';
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'root';
const host = process.env.DB_HOST || 'localhost';
const dialect = 'postgres';
const port = process.env.DB_PORT || 5432;

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
