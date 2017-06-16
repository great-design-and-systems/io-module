'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _csvWriteStream = require('csv-write-stream');

var _csvWriteStream2 = _interopRequireDefault(_csvWriteStream);

var _nodeFs = require('node-fs');

var _nodeFs2 = _interopRequireDefault(_nodeFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, next) {

    try {
        var header = !_nodeFs2.default.existsSync(param.csvPath());
        var writer = (0, _csvWriteStream2.default)({ sendHeaders: header });
        writer.pipe(_nodeFs2.default.createWriteStream(param.csvPath(), { flags: 'a' }));
        writer.write(param.csvData());
        writer.end();
        context.set('csvInfo', { path: param.csvPath(), data: param.csvData() });
        next();
    } catch (err) {
        next(err);
    }
};
var AddCsvItem = new _fluidChains.Chain(_Chain.ADD_CSV_ITEM, Action, undefined, _Chain.EXPORT_ERROR_HANDLER);
AddCsvItem.addSpec('csvPath', true);
AddCsvItem.addSpec('csvData', true);