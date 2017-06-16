'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API = undefined;

var _Chain = require('./Chain.info');

var _DomainApi = require('./DomainApi');

var _DomainApi2 = _interopRequireDefault(_DomainApi);

var _fluidChains = require('fluid-chains');

var _Import = require('./Import');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/import/';

var ImportResource = function ImportResource(app) {
    _classCallCheck(this, ImportResource);

    new _DomainApi2.default();
    (0, _Import.init)();
    app.post(API + 'create-import-csv', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.CREATE_IMPORT_CSV, {}, function (result) {});
    });
};

exports.default = ImportResource;