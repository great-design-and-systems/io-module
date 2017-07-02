'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.UploadedFile.find({}, function (err, result) {
        context.set('files', result);
        next(err);
    });
};

var GetUploadedFiles = new _fluidChains.Chain(_Chain2.GET_UPLOADED_FILES, Action, undefined, _Chain.FILE_ERROR_HANDLER);