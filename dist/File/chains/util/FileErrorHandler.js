'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _gdsConfig = require('gds-config');

var Action = function Action(context, param, next) {
    new _gdsConfig.GDSAppLogger('ERROR: ' + param.$errorFrom() + ': ' + param.$errorMessage()).error();
    next();
};
new _fluidChains.Chain(_Chain.FILE_ERROR_HANDLER, Action);