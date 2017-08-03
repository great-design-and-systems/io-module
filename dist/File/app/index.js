'use strict';

var _Chain = require('./Chain.info');

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _FileResource = require('./FileResource');

var _FileResource2 = _interopRequireDefault(_FileResource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { FileResource: _FileResource2.default, FileChains: { DELETE_FILE: _Chain.DELETE_FILE, DOWNLOAD_FILE: _Chain.DOWNLOAD_FILE, GET_FILES: _Chain.GET_FILES, GET_FILE_DETAIL_BY_ID: _Chain.GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT: _Chain.UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE: _Chain.UPLOAD_SINGLE_FILE } };