'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CreateUploadedFile = require('./CreateUploadedFile');

var _CreateUploadedFile2 = _interopRequireDefault(_CreateUploadedFile);

var _CreateUploadedFileContent = require('./CreateUploadedFileContent');

var _CreateUploadedFileContent2 = _interopRequireDefault(_CreateUploadedFileContent);

var _fluidChains = require('fluid-chains');

var _ReadUploadedFile = require('./ReadUploadedFile');

var _ReadUploadedFile2 = _interopRequireDefault(_ReadUploadedFile);

var _RemoveUploadedTempFile = require('./RemoveUploadedTempFile');

var _RemoveUploadedTempFile2 = _interopRequireDefault(_RemoveUploadedTempFile);

var _UploadedFileErrorHandling = require('./UploadedFileErrorHandling');

var _UploadedFileErrorHandling2 = _interopRequireDefault(_UploadedFileErrorHandling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    new _UploadedFileErrorHandling2.default();
    new _CreateUploadedFile2.default();
    new _CreateUploadedFileContent2.default();
    new _ReadUploadedFile2.default();
    new _RemoveUploadedTempFile2.default();
})();

var execute = function execute(file, userId, done) {
    (0, _fluidChains.ExecuteChain)('CreateUploadedFile', {
        name: file.originalFilename,
        type: file.type,
        size: file.size,
        createdBy: userId,
        path: file.path
    }, done);
};

exports.default = execute;