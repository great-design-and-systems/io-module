'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _batchflow = require('batchflow');

var _batchflow2 = _interopRequireDefault(_batchflow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, done) {
    var columns = [];
    (0, _batchflow2.default)(param.parsedData()).sequential().each(function (i, item, next) {
        if (i > 0) {
            //TODO: track(columns, item, i, next);
        } else {
            columns = item;
            next();
        }
    }).end(function () {
        done();
    });
};
var ChainAction = new _fluidChains.Chain(PARSE_RAW_CSV, Action, undefined, _Chain.IMPORT_ERROR_HANDLER);
ChainAction.addSpec('parsedData', true, undefined, true);