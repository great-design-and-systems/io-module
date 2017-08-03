'use strict';

var _fluidChains = require('fluid-chains');

var _Chain = require('./Chain.info');

var _gdsStack = require('gds-stack');

var Action = function Action(context, param, next) {
    console.log(param.$err());
    new _gdsStack.Logger('ERROR: ' + context.$owner() + ': ' + param.$errorMessage()).error();
    next();
};
new _fluidChains.Chain(_Chain.FILE_ERROR_HANDLER, Action);