'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gdsConfig = require('gds-config');

var _app = require('./app/');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPLOAD_LIMIT = process.env.UPLOAD_LIMIT || '4000kb';
var app = (0, _express2.default)();
var router = _express2.default.Router();
var PORT = process.env.PORT || 5000;
new _gdsConfig.GDSDatabase().connect(function (errDB) {
    if (errDB) {
        console.error(errDB);
    } else {
        new _gdsConfig.GDSServer(app);
        app.use(_bodyParser2.default.raw({
            limit: UPLOAD_LIMIT
        }));
        app.listen(PORT, function () {
            console.log('Express is listening to port ' + PORT);
            new _app.IOResource(app);
        });
    }
});

exports.default = app;