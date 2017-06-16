'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.findByIdAndRemove(param.exportId(), function (err) {
        next(err);
    });
};
var RemoveExportTracker = new _fluidChains.Chain(_Chain2.REMOVE_EXPORT_TRACKER, Action, undefined, _Chain.EXPORT_ERROR_HANDLER);
RemoveExportTracker.addSpec('exportId', true);