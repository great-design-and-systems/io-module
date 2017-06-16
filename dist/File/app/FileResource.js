'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API = undefined;

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/files/';

var FileResource = function FileResource(app) {
    _classCallCheck(this, FileResource);

    app.get('/upload-form', function (req, res) {
        res.status(200).send('<html><body>' + '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
    });

    app.get('/update-form/:fileId', function (req, res) {
        res.status(200).send('<html><body>' + '<form name="upload" method="post" action="' + 'http://' + req.headers.host + '/api/files/update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
    });

    app.post(API + 'upload-single-file/:userId', function (req, res) {
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

    app.get(API + 'download-file/:fileId', function (req, res) {
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

    app.post(API + 'update-single-file-content/:fileId', function (req, res) {
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

    app.delete(API + ':fileId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.DELETE_FILE, {
            fileId: req.prams.fileId
        }, function (result) {
            return res.status(result.status()).send(result.dto());
        });
    });
};

exports.default = FileResource;