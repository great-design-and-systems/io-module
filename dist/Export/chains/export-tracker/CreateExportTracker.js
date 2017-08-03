'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.create({
        description: param.description(),
        type: param.type(),
        progressLimit: param.progressLimit()
    }, function (err, result) {
        context.set('exportTracker', result);
        next(err);
    });
};

var CreateExportTracker = new _fluidChains.Chain(_Chain.CREATE_EXPORT_TRACKER, Action, undefined, _Chain2.EXPORT_ERROR_HANDLER);
CreateExportTracker.addSpec('description', true);
CreateExportTracker.addSpec('type', true);
CreateExportTracker.addSpec('progressLimit', true);