'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetDirectory = undefined;

var _nodeFs = require('node-fs');

var _nodeFs2 = _interopRequireDefault(_nodeFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSV_DIR = process.env.CSV_DIR || 'csv';

var GetDirectory = exports.GetDirectory = function GetDirectory() {
    if (!_nodeFs2.default.existsSync(CSV_DIR)) {
        _nodeFs2.default.mkdirSync(CSV_DIR);
    }
    return CSV_DIR;
};