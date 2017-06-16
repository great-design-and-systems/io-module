'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    var parsedData = param.parsedData();
    _entity.Tracker.create({
        description: param.description(),
        type: param.type(),
        progressLimit: parsedData.length - 1,
        dataFor: param.dataFor(),
        fileId: param.fileId()
    }, function (err, createdTracker) {
        context.set('tracker', createdTracker);
        next(err);
    });
};

var CreateImportTracker = new _fluidChains.Chain(_Chain.CREATE_IMPORT_TRACKER, Action, undefined, _Chain2.IMPORT_ERROR_HANDLER);

CreateImportTracker.addSpec('description', true);
CreateImportTracker.addSpec('type', true);
CreateImportTracker.addSpec('dataFor', true);
CreateImportTracker.addSpec('fileId', true);
CreateImportTracker.addSpec('parsedData', true);