'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.API = undefined;

var _gdsConfig = require('gds-config');

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Import = require('./Import');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API = exports.API = 'api/import';

var ImportResource = function (_GDSResource) {
    _inherits(ImportResource, _GDSResource);

    function ImportResource(app) {
        _classCallCheck(this, ImportResource);

        var _this = _possibleConstructorReturn(this, (ImportResource.__proto__ || Object.getPrototypeOf(ImportResource)).call(this, app, API));

        (0, _Import.init)();
        _this.post('createImportCsv', 'create-import-csv', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.CREATE_IMPORT_CSV, {}, function (result) {});
        });
        return _this;
    }

    return ImportResource;
}(_gdsConfig.GDSResource);

exports.default = ImportResource;