'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _gdsStack = require('gds-stack');

var Action = function Action(context, param, next) {
    new _gdsStack.Logger('ERROR: ' + param.$owner() + ': ' + param.$errorMessage()).error();
    next();
};
new _fluidChains.Chain(_Chain.IMPORT_ERROR_HANDLER, Action);