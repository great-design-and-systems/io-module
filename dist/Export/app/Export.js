'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = exports.AddExportItemCsv = exports.CreateExportCsv = undefined;

var _fluidChains = require('fluid-chains');

var _Chain3 = require('./Chain.info');

var _chains = require('../chains/');

var _gdsConfig = require('gds-config');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateExportCsv = exports.CreateExportCsv = function (_Chain) {
    _inherits(CreateExportCsv, _Chain);

    function CreateExportCsv() {
        _classCallCheck(this, CreateExportCsv);

        var _this = _possibleConstructorReturn(this, (CreateExportCsv.__proto__ || Object.getPrototypeOf(CreateExportCsv)).call(this, _Chain3.CREATE_EXPORT_CSV, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.ExportTracker.CREATE_EXPORT_TRACKER], {
                description: param.description(),
                type: 'csv_exporter',
                progressLimit: param.limit()
            }, function (result) {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain3.CREATE_EXPORT_CSV, result.$errorMessage()));
                    next();
                } else {
                    var tracker = result.exportTracker();
                    context.set('status', 200);
                    context.set('dto', new _gdsConfig.GDSDomainDTO(_Chain3.CREATE_EXPORT_CSV, tracker._id));
                    next();
                }
            });
        }));

        _this.addSpec('description', true);
        _this.addSpec('limit', true);
        return _this;
    }

    return CreateExportCsv;
}(_fluidChains.Chain);

var AddExportItemCsv = exports.AddExportItemCsv = function (_Chain2) {
    _inherits(AddExportItemCsv, _Chain2);

    function AddExportItemCsv() {
        _classCallCheck(this, AddExportItemCsv);

        var _this2 = _possibleConstructorReturn(this, (AddExportItemCsv.__proto__ || Object.getPrototypeOf(AddExportItemCsv)).call(this, _Chain3.ADD_EXPORT_ITEM_CSV, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_chains.Util.GET_CSV_FILE, _chains.Util.ADD_CSV_ITEM, _chains.ExportTracker.ADD_EXPORT_PROGRESS], {
                exportId: param.exportId(),
                item: param.item()
            }, function (result) {
                if (result.$err) {
                    context.set('statusCode', 500);
                    context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain3.ADD_EXPORT_ITEM_CSV, result.$errorMessage()));
                    next();
                } else {
                    if (result.status() == 'COMPLETED') {
                        (0, _fluidChains.ExecuteChain)([_chains.Util.GET_CSV_FILE], {
                            exportId: param.exportId()
                        }, function (csvResult) {
                            if (csvResult.$err) {
                                context.set('statusCode', 500);
                                context.set('dto', new _gdsConfig.GDSDomainDTO('ERROR_' + _Chain3.ADD_EXPORT_ITEM_CSV, csvResult.$errorMessage()));
                                next();
                            } else {
                                var resultExportProgress = result.exportTracker();
                                resultExportProgress.stream = _fsExtra2.default.createReadStream(csvResult.csvPath());
                                resultExportProgress.fileName = param.exportId() + '.csv';
                                resultExportProgress.stream.on('end', function () {
                                    _fsExtra2.default.remove(csvResult.csvPath());
                                });
                                _fsExtra2.default.stat(csvResult.csvPath(), function (errStat, fileStat) {
                                    if (errStat) {
                                        next(errStat);
                                    } else {
                                        resultExportProgress.fileSize = fileStat.size;
                                        context.set('statusCode', 200);
                                        context.set('exportProgress', resultExportProgress);
                                        next();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }));

        _this2.addSpec('exportId', true);
        _this2.addSpec('item', true);
        return _this2;
    }

    return AddExportItemCsv;
}(_fluidChains.Chain);

var init = exports.init = function init() {
    new CreateExportCsv();
    new AddExportItemCsv();
};