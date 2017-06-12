'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Chain = require('../chains/columns/Chain.info');

var _Chain2 = require('../chains/tracker/Chain.info');

var _fluidChains = require('fluid-chains');

var _Chain3 = require('../chains/util/Chain.info');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Import = function () {
    function Import() {
        _classCallCheck(this, Import);
    }

    _createClass(Import, [{
        key: 'createImportCsv',
        value: function createImportCsv(description, fileId, dataFor, rawEncoded, callback) {
            (0, _fluidChains.ExecuteChain)([_Chain3.PARSE_RAW_CSV, _Chain2.CREATE_IMPORT_TRACKER, _Chain.CREATE_IMPORT_COLUMNS], {
                description: description,
                type: 'csv_importer',
                dateFor: dataFor,
                fileId: fileId
            }, function (result) {
                if (result.$err) {
                    result(result.$err());
                } else {
                    callback(undefined, {
                        importId: result.columns().importId
                    });
                }
            });
        }
    }]);

    return Import;
}();

exports.default = Import;