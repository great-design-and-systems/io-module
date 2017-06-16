'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Chain2 = require('./Chain.info');

var _FileResource = require('./FileResource');

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomainApi = function (_Chain) {
    _inherits(DomainApi, _Chain);

    function DomainApi() {
        _classCallCheck(this, DomainApi);

        var _this = _possibleConstructorReturn(this, (DomainApi.__proto__ || Object.getPrototypeOf(DomainApi)).call(this, 'FileDomainApi', function (context, param, next) {
            var dto = param.dto ? param.dto() : new _gdsConfig.GDSDomainDTO();
            dto.addPost(_Chain2.UPLOAD_SINGLE_FILE, '' + param.protocol() + param.host() + _FileResource.API + 'upload-single-file/:userId');
            dto.addGet(_Chain2.DOWNLOAD_FILE, '' + param.protocol() + param.host() + _FileResource.API + 'download-file/:fileId');
            dto.addPost(_Chain2.UPDATE_SINGLE_FILE_CONTENT, '' + param.protocol() + param.host() + _FileResource.API + 'update-single-file-content/:fileId');
            dto.addDelete(_Chain2.DELETE_FILE, '' + param.protocol() + param.host() + _FileResource.API + ':fileId');
            dto.addGet(_Chain2.GET_FILE_DETAIL_BY_ID, '' + param.protocol() + param.host() + _FileResource.API + 'get-file-detail-by-id/:fileId');
            context.set('dto', dto);
            next();
        }));

        _this.addSpec('host', true);
        _this.addSpec('protocol', true);
        _this.addSpec('dto', false);
        return _this;
    }

    return DomainApi;
}(_fluidChains.Chain);

exports.default = DomainApi;