'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _nodeFs = require('node-fs');

var _nodeFs2 = _interopRequireDefault(_nodeFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, next) {
    _nodeFs2.default.readFile(param.filePath(), function (err, fileData) {
        context.set('fileData', fileData);
        if (param.fileId) {
            context.set('fileId', param.fileId());
        }
        next(err);
    });
};
var ReadFile = new _fluidChains.Chain(_Chain.READ_FILE, Action);
ReadFile.addSpec('filePath', true);
ReadFile.addSpec('fileId', false);