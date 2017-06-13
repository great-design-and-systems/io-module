'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API = undefined;

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/file/';

var FileResource = function FileResource(app) {
    _classCallCheck(this, FileResource);

    app.get('/upload-form', function (req, res) {
        res.status(200).send('<html><body>' + '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' + '<input type="file" name="uploadFile">' + '<input type="submit" value="Submit">' + '</form></body></html>');
    });

    app.post(API + 'upload-single-file/:userId', function (req, res) {
        var file = req.files.uploadFile;
        (0, _fluidChains.ExecuteChain)(_Chain.UPLOAD_SINGLE_FILE, {
            fileType: file.mimeType,
            filePath: file.path,
            fileName: file.originalname,
            fileSize: file.size,
            createdBy: req.params.userId
        }, function (result) {
            return res.status(result.status()).send(result.dto());
        });
    });
};

exports.default = FileResource;