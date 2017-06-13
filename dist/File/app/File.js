'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UploadSingleFile = undefined;

var _fluidChains = require('fluid-chains');

var _chains = require('../chains/');

var _gdsConfig = require('gds-config');

var _Chain2 = require('./Chain.info');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadSingleFile = exports.UploadSingleFile = function (_Chain) {
    _inherits(UploadSingleFile, _Chain);

    function UploadSingleFile() {
        _classCallCheck(this, UploadSingleFile);

        var _this = _possibleConstructorReturn(this, (UploadSingleFile.__proto__ || Object.getPrototypeOf(UploadSingleFile)).call(this, _Chain2.UPLOAD_SINGLE_FILE, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.UploadedFile.CREATE_UPLOADED_FILE, _chains.Util.READ_FILE, _chains.UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT, _chains.Util.REMOVE_FILE, _chains.UploadedFile.GET_UPLOADED_FILE_BY_ID], {
                fileName: param.fileName(),
                fileType: param.fileType(),
                fileSize: param.fileSize(),
                createdBy: param.createdBy(),
                filePath: param.filePath()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain2.UPLOAD_SINGLE_FILE, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new _gdsConfig.GDSDomainDTO(_Chain2.UPLOAD_SINGLE_FILE, result.uploadedFile()));
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