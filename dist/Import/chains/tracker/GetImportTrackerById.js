'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../entity/');

var Action = function Action(context, param, next) {
    _entity.Tracker.findById(param.importId(), function (err, tracker) {
        context.set('tracker', tracker);
        next(err);
    });
};
var GetImportTrackerById = new _fluidChains.Chain(_Chain.GET_IMPORT_TRACKER_BY_ID, Action, undefined, _Chain2.IMPORT_ERROR_HANDLER);
GetImportTrackerById.addSpec('importId', true);