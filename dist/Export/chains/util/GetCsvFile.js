'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Helper = require('./Helper');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, next) {
    context.set('csvPath', _path2.default.join((0, _Helper.GetDirectory)(), param.exportId() + '.csv'));
    context.set('csvData', param.item());
    next();
};
var GetCsvFile = new _fluidChains.Chain(_Chain.GET_CSV_FILE, Action, undefined, _Chain.EXPORT_ERROR_HANDLER);
GetCsvFile.addSpec('exportId', true);
GetCsvFile.addSpec('item', false);