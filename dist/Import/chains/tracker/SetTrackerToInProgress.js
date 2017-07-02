'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('../util/Chain.info');

var _Chain2 = require('./Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.Tracker.findByIdAndUpdate(param.importId(), {
        status: 'INPROGRESS'
    }, function (err) {
        next(err);
    });
};
var SetTrackerToInProgress = new _fluidChains.Chain(_Chain2.SET_TRACKER_TO_IN_PROGRESS, Action);
SetTrackerToInProgress.addSpec('importId', true);