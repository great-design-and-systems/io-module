'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _UploadedFile = require('../../entity/UploadedFile');

var _UploadedFile2 = _interopRequireDefault(_UploadedFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateUploadedFile = function (_Chain) {
    _inherits(CreateUploadedFile, _Chain);

    function CreateUploadedFile() {
        _classCallCheck(this, CreateUploadedFile);

        var _this = _possibleConstructorReturn(this, (CreateUploadedFile.__proto__ || Object.getPrototypeOf(CreateUploadedFile)).call(this, 'CreateUploadedFile', Action, 'ReadUploadedFile', 'UploadedFileErrorHandling'));

        _this.addSpec('name', true);
        _this.addSpec('type', true);
        _this.addSpec('size', true);
        _this.addSpec('createdBy', true);
        return _this;
    }

    return CreateUploadedFile;
}(_fluidChains.Chain);

exports.default = CreateUploadedFile;


var Action = function Action(context, param, done) {
    _UploadedFile2.default.create({
        fileName: param.name(),
        fileType: param.type(),
        fileSize: param.size(),
        createdBy: param.createdBy()
    }, function (err, result) {
        if (err) {
            new _gdsConfig.GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('path', param.path());
            context.set('uploadedFileId', result._id);
            context.set('uploadedFile', result);
            done();
        }
    });
};