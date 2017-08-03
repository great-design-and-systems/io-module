'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Chain = require('./Chain.info');

var _fluidChains = require('fluid-chains');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImportResource = function ImportResource(resource) {
    _classCallCheck(this, ImportResource);

    resource.post(_Chain.CREATE_IMPORT_CSV, 'create-import-csv', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_Chain.CREATE_IMPORT_CSV, {}, function (result) {});
    });
};

exports.default = ImportResource;