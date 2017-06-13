'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFile.create({
        fileName: param.fileName(),
        fileType: param.fileType(),
        fileSize: param.fileSize(),
        createdBy: param.createdBy()
    }, function (err, result) {
        context.set('fileId', result._id);
        next(err);
    });
};

var CreateUploadedFile = new _fluidChains.Chain(_Chain.CREATE_UPLOADED_FILE, Action, undefined, _Chain2.FILE_ERROR_HANDLER);
CreateUploadedFile.addSpec('fileName', true);
CreateUploadedFile.addSpec('fileType', true);
CreateUploadedFile.addSpec('fileSize', true);
CreateUploadedFile.addSpec('createdBy', true);