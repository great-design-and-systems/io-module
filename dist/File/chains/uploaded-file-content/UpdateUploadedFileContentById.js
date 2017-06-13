'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFileContent.findOneAndUpdate({ fileId: param.fileId() }, { content: param.content() }, function (err) {
        next(err);
    });
};
var GetUploadedFileContentById = new _fluidChains.Chain(_Chain.UPDATE_UPLOADED_FILE_CONTENT_BY_ID, Action, undefined, _Chain2.FILE_ERROR_HANDLER);
GetUploadedFileContentById.addSpec('fileId', true);
GetUploadedFileContentById.addSpec('content', true);