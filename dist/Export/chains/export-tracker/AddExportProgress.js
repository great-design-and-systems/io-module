'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.findById(param.exportId(), function (err, exportTracker) {
        if (exportTracker) {
            if (exportTracker.progressCount < exportTracker.progressLimit) {
                exportTracker.progressCount++;
                if (exportTracker.progressCount === 1) {
                    exportTracker.status = 'INPROGRESS';
                }
                if (exportTracker.progressCount === exportTracker.progressLimit) {
                    exportTracker.status = 'COMPLETED';
                }
            }
            _entity.ExportTracker.update({
                _id: param.exportId()
            }, exportTracker, function (errUpdateTracker, updatedTracker) {
                if (updatedTracker) {
                    updatedTracker.status = exportTracker.status;
                    updatedTracker.progressCount = exportTracker.progressCount;
                }
                context.set('exportTracker', updatedTracker);
                next(errUpdateTracker);
            });
        } else {
            context.set('exportTracker', exportTracker);
            next(err);
        }
    });
};

var AddExportProgress = new _fluidChains.Chain(_Chain.ADD_EXPORT_PROGRESS, Action, undefined, _Chain2.EXPORT_ERROR_HANDLER);
AddExportProgress.addSpec('exportId', true);