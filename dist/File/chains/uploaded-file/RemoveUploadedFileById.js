'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFile.findByIdAndRemove(param.fileId(), function (err) {
        next(err);
    });
};
var RemoveUploadedFile = new _fluidChains.Chain(_Chain2.REMOVE_UPLOADED_FILE_BY_ID, Action, undefined, _Chain.FILE_ERROR_HANDLER);
RemoveUploadedFile.addSpec('fileId', true);