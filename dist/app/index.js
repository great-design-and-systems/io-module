'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IOChains = exports.IOResource = undefined;

var _fluidChains = require('fluid-chains');

var _File = require('../File/');

var _Import = require('../Import/');

var _Export = require('../Export/');

var _gdsConfig = require('gds-config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protocol = function protocol(req) {
    return req.connection.encrypted ? 'https://' : 'http://';
};

var IOResource = exports.IOResource = function IOResource(app) {
    _classCallCheck(this, IOResource);

    new _Export.ExportResource(app);
    var fileResource = new _File.FileResource(app);
    var importResource = new _Import.ImportResource(app);
    app.get('/gds', function (req, res) {
        res.status(200).send({
            "import": importResource.getDTO(req),
            "file": fileResource.getDTO(req)
        });
    });

    this.getApi = function (req) {
        return {
            "import": importResource.getDTO(req),
            "file": fileResource.getDTO(req),
            "export": ""
        };
    };
};

var IOChains = exports.IOChains = {
    ImportChains: _Import.Chains,
    FileChains: _File.Chains
};