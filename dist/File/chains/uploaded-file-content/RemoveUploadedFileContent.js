'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFileContent.findOneAndRemove({ fileId: param.fileId() }, function (err) {
        next(err);
    });
};
var RemoveUploadedFileContent = new _fluidChains.Chain(_Chain2.REMOVE_UPLOADED_FILE_CONTENT, Action, undefined, _Chain.FILE_ERROR_HANDLER);
RemoveUploadedFileContent.addSpec('fileId', true);