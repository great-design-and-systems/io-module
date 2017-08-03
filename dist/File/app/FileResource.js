'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileResource = function FileResource(resource) {
    _classCallCheck(this, FileResource);

    resource.get('uploadForm', 'upload-form', function (req, res) {
        res.status(200).send('<html><body>' + '<form name="upload" method="post" action="upload-single-file/0001" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
    });

    resource.get('updateForm', 'update-form/:fileId', function (req, res) {
        res.status(200).send('<html><body>' + '<form name="upload" method="post" action="update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
    });

    resource.post(_Chain.COPY_FILE_FROM_URL, 'copy-file-from-url', function (req, res) {
        var fileName = req.body.fileName;
        var fileURL = req.body.fileURL;
        var createdBy = 'SYSTEM';
        (0, _fluidChains.ExecuteChain)(_Chain.COPY_FILE_FROM_URL, {
            fileName: fileName, fileURL: fileURL, createdBy: createdBy
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });

    resource.post(_Chain.UPLOAD_SINGLE_FILE, 'upload-single-file/:userId', function (req, res) {
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

    resource.get(_Chain.DOWNLOAD_FILE, 'download-file/:fileId', function (req, res) {
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

    resource.post(_Chain.UPDATE_SINGLE_FILE_CONTENT, 'update-single-file-content/:fileId', function (req, res) {
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

    resource.delete(_Chain.DELETE_FILE, ':fileId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.DELETE_FILE, {
            fileId: req.prams.fileId
        }, function (result) {
            return res.status(result.status()).send(result.dto());
        });
    });
    resource.get(_Chain.GET_FILE_DETAIL_BY_ID, 'get-file-detail-by-id/:fileId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.GET_FILE_DETAIL_BY_ID, {
            fileId: req.params.fileId
        }, function (result) {
            return res.status(result.status()).send(result.dto());
        });
    });
    resource.get(_Chain.GET_FILES, 'get-files', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.GET_FILES, {}, function (result) {
            return res.status(result.status()).send(result.dto());
        });
    });
};

exports.default = FileResource;