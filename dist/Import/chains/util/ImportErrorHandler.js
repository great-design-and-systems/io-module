'use strict';

var _fluidChains = require('fluid-chains');

var _gdsConfig = require('gds-config');

var _Chain = require('./Chain.info');

var Action = function Action(context, param, next) {
    new _gdsConfig.GDSAppLogger('ERROR: ' + param.$owner() + ': ' + param.$errorMessage()).error();
    next();
};
new _fluidChains.Chain(_Chain.IMPORT_ERROR_HANDLER, Action);