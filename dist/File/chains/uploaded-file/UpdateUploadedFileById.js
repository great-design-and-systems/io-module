'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFile.findOneAndUpdate({ fileId: param.fileId() }, param.data(), function (err) {
        next(err);
    });
};
var GetUploadedFileById = new _fluidChains.Chain(_Chain.UPDATE_UPLOADED_FILE_BY_ID, Action, undefined, _Chain2.FILE_ERROR_HANDLER);
GetUploadedFileById.addSpec('fileId', true);
GetUploadedFileById.addSpec('data', true);