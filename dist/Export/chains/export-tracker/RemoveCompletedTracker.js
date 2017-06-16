'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.remove({ status: 'COMPLETED' }, function (err) {
        next(err);
    });
};

var RemoveCompletedTracker = new _fluidChains.Chain(_Chain.REMOVE_COMPLETED_TRACKER, Action, undefined, _Chain2.EXPORT_ERROR_HANDLER);