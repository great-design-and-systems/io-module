'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.API = undefined;

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _Export = require('./Export');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API = exports.API = 'api/export';

var ExportResource = function (_GDSResource) {
    _inherits(ExportResource, _GDSResource);

    function ExportResource(app) {
        _classCallCheck(this, ExportResource);

        var _this = _possibleConstructorReturn(this, (ExportResource.__proto__ || Object.getPrototypeOf(ExportResource)).call(this, app, API));

        (0, _Export.init)();
        _this.post(_Chain.CREATE_EXPORT_CSV, 'create-export-csv', function (req, res) {
            var csvInfo = req.body;
            (0, _fluidChains.ExecuteChain)(_Chain.CREATE_EXPORT_CSV, {
                description: csvInfo.description,
                limit: csvInfo.limit
            }, function (result) {
                return res.status(result.status()).send(result.dto());
            });
        });

        _this.put(_Chain.ADD_EXPORT_ITEM_CSV, 'add-export-item-csv/:exportId', function (req, res) {
            (0, _fluidChains.ExecuteChain)(_Chain.ADD_EXPORT_ITEM_CSV, {
                exportId: req.params.exportId,
                item: req.body
            }, function (result) {
                var exportProgress = result.exportProgress();
                if (exportProgress.status() === 'COMPLETED') {
                    res.setHeader('Content-type', 'text/csv');
                    res.setHeader('Content-length', exportProgress.fileSize);
                    exportProgress.stream.pipe(res);
                } else {
                    res.status(result.statusCode()).send(result.dto());
                }
            });
        });
        return _this;
    }

    return ExportResource;
}(_gdsConfig.GDSResource);

exports.default = ExportResource;