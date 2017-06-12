'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadedFileErrorHandling = function (_Chain) {
    _inherits(UploadedFileErrorHandling, _Chain);

    function UploadedFileErrorHandling() {
        _classCallCheck(this, UploadedFileErrorHandling);

        return _possibleConstructorReturn(this, (UploadedFileErrorHandling.__proto__ || Object.getPrototypeOf(UploadedFileErrorHandling)).call(this, 'UploadedFileErrorHandling', function (context, param, next) {
            console.log('UploadedFileErrorHandling');
            new _gdsConfig.GDSAppLogger('Failed on chain: ', param.$owner()).info();
            new _gdsConfig.GDSAppLogger(param.$errorMessage).error();
            next();
        }));
    }

    return UploadedFileErrorHandling;
}(_fluidChains.Chain);

exports.default = UploadedFileErrorHandling;