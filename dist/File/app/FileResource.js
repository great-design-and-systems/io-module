'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.API = undefined;

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _File = require('./File');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API = exports.API = 'api/files';

var FileResource = function (_GDSResource) {
    _inherits(FileResource, _GDSResource);

    function FileResource(app) {
        _classCallCheck(this, FileResource);

        var _this = _possibleConstructorReturn(this, (FileResource.__proto__ || Object.getPrototypeOf(FileResource)).call(this, app, API));

        (0, _File.init)();
        _this.get('uploadForm', 'upload-form', function (req, res) {
            res.status(200).send('<html><body>' + '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
        });

        _this.get('updateForm', 'update-form/:fileId', function (req, res) {
            res.status(200).send('<html><body>' + '<form name="upload" method="post" action="' + 'http://' + req.headers.host + '/api/files/update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
        });

        _this.post(_Chain.UPLOAD_SINGLE_FILE, 'upload-single-file/:userId', function (req, res) {
            var file = req.files.uploadFile;
            (0, _fluidChains.ExecuteChain)(_Chain.UPLOAD_SINGLE_FILE, {
                fileType: file.type,
                filePath: file.path,
                fileName: file.originalFilename,
                fileSize: file.size,
                createdBy: req.params.userId
            }, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });

        _this.get(_Chain.DOWNLOAD_FILE, 'download-file/:fileId', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.DOWNLOAD_FILE, {
                fileId: req.params.fileId
            }, function (result) {
                if (result.status() === 200) {
                    var content = result.content();
                    res.setHeader('Content-disposition', 'attachment; filename=' + result.fileName());
                    res.setHeader('Content-type', result.fileType());
                    res.status(result.status()).send(content[0].content);
                } else {
                    res.status(result.status()).send(result.dto());
                }
            });
        });

        _this.post(_Chain.UPDATE_SINGLE_FILE_CONTENT, 'update-single-file-content/:fileId', function (req, res) {
            var file = req.files.uploadFile;
            (0, _fluidChains.ExecuteChain)(_Chain.UPDATE_SINGLE_FILE_CONTENT, {
                fileId: req.params.fileId,
                filePath: file.path,
                uploadedFileInputUpdate: {
                    updatedOn: new Date(),
                    fileSize: file.size
                }
            }, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });

        _this.delete(_Chain.DELETE_FILE, ':fileId', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.DELETE_FILE, {
                fileId: req.prams.fileId
            }, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });

        _this.get(_Chain.GET_FILE_DETAIL_BY_ID, 'get-file-detail-by-id/:fileId', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.GET_FILE_DETAIL_BY_ID, {
                fileId: req.params.fileId
            }, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });

        _this.get(_Chain.GET_FILES, 'get-files', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.GET_FILES, {}, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });
        return _this;
    }

    return FileResource;
}(_gdsConfig.GDSResource);

exports.default = FileResource;