'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFileContent.create({
        fileId: param.fileId(),
        content: param.fileData(),
        contentSequence: 0
    }, function (err, result) {
        context.set('fileId', param.fileId());
        context.set('fileContentId', result._id);
        next(err);
    });
};

var CreateUploadedFileContent = new _fluidChains.Chain(_Chain.CREATE_UPLOADED_FILE_CONTENT, Action, undefined, _Chain2.FILE_ERROR_HANDLER);
CreateUploadedFileContent.addSpec('fileId', true);
CreateUploadedFileContent.addSpec('fileData', true);