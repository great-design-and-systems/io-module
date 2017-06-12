'use strict';

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../chains/columns/Chain.info');

var _Chain3 = require('./Chain.info');

var _Chain4 = require('../chains/tracker/Chain.info');

var _Chain5 = require('../chains/util/Chain.info');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateImportCSV = function (_Chain) {
    _inherits(CreateImportCSV, _Chain);

    function CreateImportCSV() {
        _classCallCheck(this, CreateImportCSV);

        var _this = _possibleConstructorReturn(this, (CreateImportCSV.__proto__ || Object.getPrototypeOf(CreateImportCSV)).call(this, _Chain3.CREATE_IMPORT_CSV, function (context, param, next) {
            (0, _fluidChains.ExecuteChain)([_Chain5.PARSE_RAW_CSV, _Chain4.CREATE_IMPORT_TRACKER, _Chain2.CREATE_IMPORT_COLUMNS], {
                description: param.description(),
                type: 'csv_importer',
                dateFor: param.dataFor(),
                fileId: param.fileId()
            }, function (result) {
                context.set('importId', result.columns().importId);
                next(result.$err ? result.$err() : undefined);
            });
        }));

        _this.addSpec('description', true);
        _this.addSpec('fieldId', true);
        _this.addSpec('dataFor', true);
        return _this;
    }

    return CreateImportCSV;
}(_fluidChains.Chain);

new CreateImportCSV();