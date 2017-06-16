'use strict';

var _Chain = require('./Chain.info');

var _Chain2 = _interopRequireDefault(_Chain);

var _ImportResource = require('./ImportResource');

var _ImportResource2 = _interopRequireDefault(_ImportResource);

var _Import = require('./Import');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { initChains: _Import.init, ImportResource: _ImportResource2.default, Chains: _Chain2.default };