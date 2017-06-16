'use strict';

var _Chain = require('./Chain.info');

var _Chain2 = _interopRequireDefault(_Chain);

var _FileResource = require('./FileResource');

var _FileResource2 = _interopRequireDefault(_FileResource);

var _File = require('./File');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { FileResource: _FileResource2.default, Chains: _Chain2.default, initChains: _File.init };