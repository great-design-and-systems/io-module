'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFile.findById(param.fileId(), function (err, uploaded) {
        context.set('uploadedFile', uploaded);
        next(err);
    });
};
var GetUploadedFileById = new _fluidChains.Chain(_Chain2.GET_UPLOADED_FILE_BY_ID, Action, undefined, _Chain.FILE_ERROR_HANDLER);
GetUploadedFileById.addSpec('fileId', true);