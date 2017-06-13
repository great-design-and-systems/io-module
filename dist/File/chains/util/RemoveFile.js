'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _nodeFs = require('node-fs');

var _nodeFs2 = _interopRequireDefault(_nodeFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Action = function Action(context, param, next) {
    _nodeFs2.default.unlink(param.filePath(), function (err) {
        if (param.fileId) {
            context.set('fileId', param.fileId());
        }
        next(err);
    });
};
var RemoveFile = new _fluidChains.Chain(_Chain.REMOVE_FILE, Action);
RemoveFile.addSpec('filePath', true);
RemoveFile.addSpec('fileId', false, undefined, true);