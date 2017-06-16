'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFileContent.findOneAndUpdate({ fileId: param.fileId() }, { content: param.fileData() }, function (err) {
        next(err);
    });
};
var GetUploadedFileContentById = new _fluidChains.Chain(_Chain2.UPDATE_UPLOADED_FILE_CONTENT_BY_ID, Action, undefined, _Chain.FILE_ERROR_HANDLER);
GetUploadedFileContentById.addSpec('fileId', true);
GetUploadedFileContentById.addSpec('fileData', true);