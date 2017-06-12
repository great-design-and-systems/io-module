'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fluidChains = require('fluid-chains');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoveUploadedTempFile = function (_Chain) {
    _inherits(RemoveUploadedTempFile, _Chain);

    function RemoveUploadedTempFile() {
        _classCallCheck(this, RemoveUploadedTempFile);

        var _this = _possibleConstructorReturn(this, (RemoveUploadedTempFile.__proto__ || Object.getPrototypeOf(RemoveUploadedTempFile)).call(this, 'RemoveUploadedTempFile', Action, undefined, 'UploadedFileErrorHandling'));

        _this.addSpec('path', true);
        return _this;
    }

    return RemoveUploadedTempFile;
}(_fluidChains.Chain);

exports.default = RemoveUploadedTempFile;


var Action = function Action(context, param, done) {
    _fsExtra2.default.unlink(param.path());
    context.set('uploadedFileId', param.uploadedFileId());
    context.set('uploadedFileContentId', param.uploadedFileContentId());
    context.set('uploadedFile', param.uploadedFile());
    done();
};