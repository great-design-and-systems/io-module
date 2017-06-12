'use strict';

var _app = require('./app/');

new _app.DomainApi();
module.exports = { ExportResource: _app.ExportResource };