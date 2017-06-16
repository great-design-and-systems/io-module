'use strict';

var _app = require('./app/');

(0, _app.initChains)();
module.exports = { ImportResource: _app.ImportResource, Chains: _app.Chains };