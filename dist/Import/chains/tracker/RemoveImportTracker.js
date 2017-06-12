'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../entity/');

var Action = function Action(context, param, next) {
    _entity.Tracker.findByIdAndRemove(param.importId(), function (err) {
        next(err);
    });
};
var RemoveImportTracker = new _fluidChains.Chain(_Chain2.REMOVE_IMPORT_TRACKER, Action, undefined, _Chain2.REMOVE_IMPORT_TRACKER);
RemoveImportTracker.addSpec('importId', true);