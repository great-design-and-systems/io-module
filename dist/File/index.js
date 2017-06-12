'use strict';

var _app = require('./app/');

new _app.DomainApi();
module.exports = { FileResource: _app.FileResource };