'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../entity/');

var Action = function Action(context, param, next) {
    _entity.Tracker.find({
        status: 'INPROGRESS'
    }, function (err, result) {
        context.set('trackers', result);
        next(err);
    });
};
new _fluidChains.Chain(_Chain.GET_IMPORT_TRACKER_IN_PROGRESS, Action, undefined, _Chain2.IMPORT_ERROR_HANDLER);