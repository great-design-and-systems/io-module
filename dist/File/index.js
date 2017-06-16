'use strict';

var _app = require('./app/');

(0, _app.initChains)();
module.exports = { FileResource: _app.FileResource, Chains: _app.Chains };