'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadUploadedFile = function (_Chain) {
    _inherits(ReadUploadedFile, _Chain);

    function ReadUploadedFile() {
        _classCallCheck(this, ReadUploadedFile);

        var _this = _possibleConstructorReturn(this, (ReadUploadedFile.__proto__ || Object.getPrototypeOf(ReadUploadedFile)).call(this, 'ReadUploadedFile', Action, 'CreateUploadedFileContent', 'UploadedFileErrorHandling'));

        _this.addSpec('path', true);
        return _this;
    }

    return ReadUploadedFile;
}(_fluidChains.Chain);

exports.default = ReadUploadedFile;


var Action = function Action(context, param, done) {
    _fsExtra2.default.readFile(param.path(), function (err, fileData) {
        if (err) {
            new _gdsConfig.GDSAppLogger(err).error();
            _fsExtra2.default.unlink(param.path());
            throw err;
        } else {
            context.set('contentSequence', 0);
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('path', param.path());
            context.set('fileData', fileData);
            context.set('uploadedFile', param.uploadedFile());
            done();
        }
    });
};