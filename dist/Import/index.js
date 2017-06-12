'use strict';

var _app = require('./app/');

var _chains = require('./chains/');

var _chains2 = _interopRequireDefault(_chains);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app.DomainApi();
module.exports = { ImportResource: _app.ImportResource, Chains: _chains2.default };