'use strict';

var _Chain9 = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _chains = require('../chains/');

var _gdsStack = require('gds-stack');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadSingleFile = function (_Chain) {
    _inherits(UploadSingleFile, _Chain);

    function UploadSingleFile() {
        _classCallCheck(this, UploadSingleFile);

        var _this = _possibleConstructorReturn(this, (UploadSingleFile.__proto__ || Object.getPrototypeOf(UploadSingleFile)).call(this, _Chain9.UPLOAD_SINGLE_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFile.CREATE_UPLOADED_FILE, _chains.Util.READ_FILE, _chains.UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT, _chains.Util.REMOVE_FILE, _chains.UploadedFile.GET_UPLOADED_FILE_BY_ID], {
                fileName: param.fileName(),
                fileType: param.fileType(),
                fileSize: param.fileSize(),
                createdBy: param.createdBy(),
                filePath: param.filePath()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.UPLOAD_SINGLE_FILE, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.UPLOAD_SINGLE_FILE, result.uploadedFile()));
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

var DownloadFile = function (_Chain2) {
    _inherits(DownloadFile, _Chain2);

    function DownloadFile() {
        _classCallCheck(this, DownloadFile);

        var _this2 = _possibleConstructorReturn(this, (DownloadFile.__proto__ || Object.getPrototypeOf(DownloadFile)).call(this, _Chain9.DOWNLOAD_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFileContent.GET_UPLOADED_FILE_CONTENT_BY_ID], { fileId: param.fileId() }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.DOWNLOAD_FILE, result.$errorMessage()));
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

var UpdateSingleFileContent = function (_Chain3) {
    _inherits(UpdateSingleFileContent, _Chain3);

    function UpdateSingleFileContent() {
        _classCallCheck(this, UpdateSingleFileContent);

        var _this3 = _possibleConstructorReturn(this, (UpdateSingleFileContent.__proto__ || Object.getPrototypeOf(UpdateSingleFileContent)).call(this, _Chain9.UPDATE_SINGLE_FILE_CONTENT, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.Util.READ_FILE, _chains.UploadedFileContent.UPDATE_UPLOADED_FILE_CONTENT_BY_ID, _chains.Util.REMOVE_FILE, _chains.UploadedFile.UPDATE_UPLOADED_FILE_BY_ID], {
                fileId: param.fileId(),
                uploadedFileInputUpdate: param.uploadedFileInputUpdate(),
                filePath: param.filePath()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.UPDATE_SINGLE_FILE_CONTENT, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.UPDATE_SINGLE_FILE_CONTENT, "File update completed."));
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

var DeleteFile = function (_Chain4) {
    _inherits(DeleteFile, _Chain4);

    function DeleteFile() {
        _classCallCheck(this, DeleteFile);

        var _this4 = _possibleConstructorReturn(this, (DeleteFile.__proto__ || Object.getPrototypeOf(DeleteFile)).call(this, _Chain9.DELETE_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFileContent.REMOVE_UPLOADED_FILE_CONTENT_BY_ID, _chains.UploadedFile.REMOVE_UPLOADED_FILE], {
                fileId: param.fileId()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.DELETE_FILE, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.DELETE_FILE, 'File with id: ' + param.fileId() + ' have been removed.'));
                    next();
                }
            });
        }));

        _this4.addSpec('fileId', true);
        return _this4;
    }

    return DeleteFile;
}(_fluidChains.Chain);

var GetFileDetailById = function (_Chain5) {
    _inherits(GetFileDetailById, _Chain5);

    function GetFileDetailById() {
        _classCallCheck(this, GetFileDetailById);

        var _this5 = _possibleConstructorReturn(this, (GetFileDetailById.__proto__ || Object.getPrototypeOf(GetFileDetailById)).call(this, _Chain9.GET_FILE_DETAIL_BY_ID, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)(_chains.UploadedFile.GET_UPLOADED_FILE_BY_ID, {
                fileId: param.fileId()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.GET_FILE_DETAIL_BY_ID, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.GET_FILE_DETAIL_BY_ID, result.uploadedFile()));
                    next();
                }
            });
        }));

        _this5.addSpec('fileId', true);
        return _this5;
    }

    return GetFileDetailById;
}(_fluidChains.Chain);

var GetFiles = function (_Chain6) {
    _inherits(GetFiles, _Chain6);

    function GetFiles() {
        _classCallCheck(this, GetFiles);

        return _possibleConstructorReturn(this, (GetFiles.__proto__ || Object.getPrototypeOf(GetFiles)).call(this, _Chain9.GET_FILES, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)(_chains.UploadedFile.GET_UPLOADED_FILES, {}, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.GET_FILES, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.GET_FILES, result.files()));
                    next();
                }
            });
        }));
    }

    return GetFiles;
}(_fluidChains.Chain);

var CopyFileFromUrl = function (_Chain7) {
    _inherits(CopyFileFromUrl, _Chain7);

    function CopyFileFromUrl() {
        _classCallCheck(this, CopyFileFromUrl);

        var _this7 = _possibleConstructorReturn(this, (CopyFileFromUrl.__proto__ || Object.getPrototypeOf(CopyFileFromUrl)).call(this, _Chain9.COPY_FILE_FROM_URL, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.Util.GET_FILE_INFO_FROM_URL, _chains.UploadedFile.CREATE_UPLOADED_FILE, _chains.Util.GET_FILE_BUFFER_FROM_URL, _chains.UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT], {
                fileName: param.fileName(),
                fileURL: param.fileURL(),
                createdBy: param.createdBy()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.COPY_FILE_FROM_URL, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.COPY_FILE_FROM_URL, { fileId: result.fileId(), fileContentId: result.fileContentId() }));
                    next();
                }
            });
        }));

        _this7.addSpec('fileName').require();
        _this7.addSpec('createdBy').require();
        _this7.addSpec('fileURL').require();
        return _this7;
    }

    return CopyFileFromUrl;
}(_fluidChains.Chain);

var AttachFileToUser = function (_Chain8) {
    _inherits(AttachFileToUser, _Chain8);

    function AttachFileToUser() {
        _classCallCheck(this, AttachFileToUser);

        var _this8 = _possibleConstructorReturn(this, (AttachFileToUser.__proto__ || Object.getPrototypeOf(AttachFileToUser)).call(this, _Chain9.ATTACH_FILE_TO_USER, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)(_chains.UploadedFile.UPDATE_UPLOADED_FILE_BY_ID, {
                fileId: param.fileId(),
                uploadedFileInputUpdate: {
                    usedBy: param.usedBy()
                }
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _Chain9.ATTACH_FILE_TO_USER, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsStack.GDSDomainDTO(_Chain9.ATTACH_FILE_TO_USER, { fileId: param.fileId(), message: 'Updated' }));
                    next();
                }
            });
        }));

        _this8.addSpec('usedBy').require();
        _this8.addSpec('fileId').require();
        return _this8;
    }

    return AttachFileToUser;
}(_fluidChains.Chain);

var init = function init() {
    new UploadSingleFile();
    new DownloadFile();
    new UpdateSingleFileContent();
    new DeleteFile();
    new GetFileDetailById();
    new GetFiles();
    new CopyFileFromUrl();
    new AttachFileToUser();
};

init();