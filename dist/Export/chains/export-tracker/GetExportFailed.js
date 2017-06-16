'use strict';

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain2 = require('../util/Chain.info');

var _entity = require('../../entity/');

var Action = function Action(context, param, next) {
    _entity.ExportTracker.find().where('status').equals('FAILED').sort('-createdOn').exec(function (err, data) {
        context.set('exportTrackers', data);
        next(err);
    });
};

var GetExportFailed = new _fluidChains.Chain(_Chain.GET_EXPORT_FAILED, Action, undefined, _Chain2.EXPORT_ERROR_HANDLER);