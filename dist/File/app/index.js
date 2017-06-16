'use strict';

var _File = require('./File');

var _Chain = require('./Chain.info');

var _Chain2 = _interopRequireDefault(_Chain);

var _DomainApi = require('./DomainApi');

var _DomainApi2 = _interopRequireDefault(_DomainApi);

var _FileResource = require('./FileResource');

var _FileResource2 = _interopRequireDefault(_FileResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initChains = function initChains() {
    new _DomainApi2.default();
    new _File.UploadSingleFile();
    new _File.DownloadFile();
    new _File.UpdateSingleFileContent();
};
module.exports = { FileResource: _FileResource2.default, Chains: _Chain2.default, initChains: initChains };