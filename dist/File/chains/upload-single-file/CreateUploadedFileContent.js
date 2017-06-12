'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _UploadedFileContent = require('../../entity/UploadedFileContent');

var _UploadedFileContent2 = _interopRequireDefault(_UploadedFileContent);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateUploadedFileContent = function (_Chain) {
    _inherits(CreateUploadedFileContent, _Chain);

    function CreateUploadedFileContent() {
        _classCallCheck(this, CreateUploadedFileContent);

        var _this = _possibleConstructorReturn(this, (CreateUploadedFileContent.__proto__ || Object.getPrototypeOf(CreateUploadedFileContent)).call(this, 'CreateUploadedFileContent', Action, 'RemoveUploadedTempFile', 'UploadedFileErrorHandling'));

        _this.addSpec('uploadedFileId', true);
        _this.addSpec('fileData', true);
        return _this;
    }

    return CreateUploadedFileContent;
}(_fluidChains.Chain);

exports.default = CreateUploadedFileContent;


var Action = function Action(context, param, done) {
    _UploadedFileContent2.default.create({
        fileId: param.uploadedFileId(),
        content: param.fileData(),
        contentSequence: param.contentSequence()
    }, function (err, result) {
        if (err) {
            _fsExtra2.default.unlink(param.path());
            new _gdsConfig.GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('uploadedFileContentId', result._id);
            context.set('uploadedFile', param.uploadedFile());
            context.set('path', param.path());
            done();
        }
    });
};