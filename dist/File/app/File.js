'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RemoveFile = exports.UpdateSingleFileContent = exports.DownloadFile = exports.UploadSingleFile = undefined;

var _fluidChains = require('fluid-chains');

var _Chain5 = require('./Chain.info');

var _chains = require('../chains/');

var _gdsConfig = require('gds-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadSingleFile = exports.UploadSingleFile = function (_Chain) {
    _inherits(UploadSingleFile, _Chain);

    function UploadSingleFile() {
        _classCallCheck(this, UploadSingleFile);

        var _this = _possibleConstructorReturn(this, (UploadSingleFile.__proto__ || Object.getPrototypeOf(UploadSingleFile)).call(this, _Chain5.UPLOAD_SINGLE_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFile.CREATE_UPLOADED_FILE, _chains.Util.READ_FILE, _chains.UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT, _chains.Util.REMOVE_FILE, _chains.UploadedFile.GET_UPLOADED_FILE_BY_ID], {
                fileName: param.fileName(),
                fileType: param.fileType(),
                fileSize: param.fileSize(),
                createdBy: param.createdBy(),
                filePath: param.filePath()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain5.UPLOAD_SINGLE_FILE, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsConfig.GDSDomainDTO(_Chain5.UPLOAD_SINGLE_FILE, result.uploadedFile()));
                    next();
                }
            });
        }));

        _this.addSpec('fileName', true);
        _this.addSpec('fileType', true);
        _this.addSpec('fileSize', true);
        _this.addSpec('createdBy', true);
        _this.addSpec('filePath', true);
        return _this;
    }

    return UploadSingleFile;
}(_fluidChains.Chain);

var DownloadFile = exports.DownloadFile = function (_Chain2) {
    _inherits(DownloadFile, _Chain2);

    function DownloadFile() {
        _classCallCheck(this, DownloadFile);

        var _this2 = _possibleConstructorReturn(this, (DownloadFile.__proto__ || Object.getPrototypeOf(DownloadFile)).call(this, _Chain5.DOWNLOAD_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFileContent.GET_UPLOADED_FILE_CONTENT_BY_ID], { fileId: param.fileId() }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain5.DOWNLOAD_FILE, result.$errorMessage()));
                    next();
                } else {
                    (0, _fluidChains.ExecuteChain)(_chains.UploadedFile.GET_UPLOADED_FILE_BY_ID, {
                        fileId: param.fileId()
                    }, function (uploadedFileResult) {
                        if (!uploadedFileResult.$err) {
                            var uploadedFile = uploadedFileResult.uploadedFile();
                            context.set('status', 200);
                            context.set('content', result.uploadedFileContent());
                            context.set('fileName', uploadedFile.fileName);
                            context.set('fileSize', uploadedFile.fileSize);
                            context.set('fileType', uploadedFile.fileType);
                            next();
                        } else {
                            next(uploadedFileResult.$err());
                        }
                    });
                }
            });
        }));

        _this2.addSpec('fileId', true);
        return _this2;
    }

    return DownloadFile;
}(_fluidChains.Chain);

var UpdateSingleFileContent = exports.UpdateSingleFileContent = function (_Chain3) {
    _inherits(UpdateSingleFileContent, _Chain3);

    function UpdateSingleFileContent() {
        _classCallCheck(this, UpdateSingleFileContent);

        var _this3 = _possibleConstructorReturn(this, (UpdateSingleFileContent.__proto__ || Object.getPrototypeOf(UpdateSingleFileContent)).call(this, _Chain5.UPDATE_SINGLE_FILE_CONTENT, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.Util.READ_FILE, _chains.UploadedFileContent.UPDATE_UPLOADED_FILE_CONTENT_BY_ID, _chains.Util.REMOVE_FILE, _chains.UploadedFile.UPDATE_UPLOADED_FILE_BY_ID], {
                fileId: param.fileId(),
                uploadedFileInputUpdate: param.uploadedFileInputUpdate(),
                filePath: param.filePath()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain5.UPDATE_SINGLE_FILE_CONTENT, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsConfig.GDSDomainDTO(_Chain5.UPDATE_SINGLE_FILE_CONTENT, "File update completed."));
                    next();
                }
            });
        }));

        _this3.addSpec('uploadedFileInputUpdate', true);
        _this3.addSpec('fileId', true);
        _this3.addSpec('filePath', true);
        return _this3;
    }

    return UpdateSingleFileContent;
}(_fluidChains.Chain);

var RemoveFile = exports.RemoveFile = function (_Chain4) {
    _inherits(RemoveFile, _Chain4);

    function RemoveFile() {
        _classCallCheck(this, RemoveFile);

        var _this4 = _possibleConstructorReturn(this, (RemoveFile.__proto__ || Object.getPrototypeOf(RemoveFile)).call(this, _Chain5.DELETE_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFileContent.REMOVE_UPLOADED_FILE_CONTENT_BY_ID, _chains.UploadedFile.REMOVE_UPLOADED_FILE], {
                fileId: param.fileId()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain5.DELETE_FILE, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsConfig.GDSDomainDTO(_Chain5.DELETE_FILE, 'File with id: ' + param.fileId() + ' have been removed.'));
                    next();
                }
            });
        }));

        _this4.addSpec('fileId', true);
        return _this4;
    }

    return RemoveFile;
}(_fluidChains.Chain);