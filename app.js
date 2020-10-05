'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

var routePath = './src/routes/';
var app = express();
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    cors({
        exposedHeaders: ['Content-Type', 'Authorization']
    })
);

const loggerOption = process.env.NODE_ENV === 'production' ? 'common' : 'dev';
app.use(logger(loggerOption));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync(routePath).forEach((file) => {
    const route = routePath + file;
    require(route)(app);
});

app.listen(3000);
module.exports = app;
