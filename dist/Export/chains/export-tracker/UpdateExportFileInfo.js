'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.findByIdAndUpdate(param.exportId(), { $set: { fileId: param.fileId() } }, { new: true }, // true to return the modified document rather than the original
    function (err, updatedTracker) {
        context.set('exportTracker', updatedTracker);
        next(err);
    });
};

var UpdateExportFileInfo = new _fluidChains.Chain(_Chain.UPDATE_EXPORT_FILE_INFO, Action, undefined, _Chain2.EXPORT_ERROR_HANDLER);
UpdateExportFileInfo.addSpec('exportId', true);
UpdateExportFileInfo.addSpec('fileId', true);