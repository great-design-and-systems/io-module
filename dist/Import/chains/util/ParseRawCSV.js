'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, next) {
    (0, _csvParse2.default)(param.fileData(), {
        comment: '#'
    }, function (err, data) {
        context.set('parsedData', data);
        next(err);
    });
};
var ParseRawCSV = new _fluidChains.Chain(_Chain.PARSE_RAW_CSV, Action, undefined, _Chain.IMPORT_ERROR_HANDLER);
ParseRawCSV.addSpec('fileData', true, undefined, true);