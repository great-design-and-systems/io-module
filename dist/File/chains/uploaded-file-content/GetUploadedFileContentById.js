'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFileContent.find({ fileId: param.fileId() }, function (err, uploaded) {
        context.set('uploadedFileContent', uploaded);
        next(err);
    });
};
var GetUploadedFileContentById = new _fluidChains.Chain(_Chain.GET_UPLOADED_FILE_CONTENT_BY_ID, Action, undefined, _Chain2.FILE_ERROR_HANDLER);
GetUploadedFileContentById.addSpec('fileId', true);