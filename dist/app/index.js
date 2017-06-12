'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IOChains = exports.IOResourceChain = exports.IOResource = undefined;

var _fluidChains = require('fluid-chains');

var _Import = require('../Import/');

var _Export = require('../Export/');

var _File = require('../File/');

var _gdsConfig = require('gds-config');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protocol = function protocol(req) {
    return req.connection.encrypted ? 'https://' : 'http://';
};

var IOResource = exports.IOResource = function IOResource(app) {
    _classCallCheck(this, IOResource);

    new _Export.ExportResource(app);
    new _File.FileResource(app);
    new _Import.ImportResource(app);
    app.get('/gds', function (req, res) {
        (0, _fluidChains.ExecuteChain)(['ImportDomainApi', 'ExportDomainApi', 'FileDomainApi'], { host: req.headers.host, protocol: protocol(req) }, function (result) {
            res.status(200).send(result.dto());
        });
    });
};

var IOResourceChain = exports.IOResourceChain = function (_Chain) {
    _inherits(IOResourceChain, _Chain);

    function IOResourceChain() {
        _classCallCheck(this, IOResourceChain);

        var _this = _possibleConstructorReturn(this, (IOResourceChain.__proto__ || Object.getPrototypeOf(IOResourceChain)).call(this, 'IOResourceChain', function (context, param, next) {
            var domain = param.domain ? param.domain : [];
            var protocol = param.protocol();
            var host = param.host();
            (0, _fluidChains.ExecuteChain)(['ImportDomainApi', 'ExportDomainApi', 'FileDomainApi'], { host: host, protocol: protocol }, function (result) {
                domain.push(result.dto());
                context.set('domain', domain);
                next();
            });
        }));

        _this.addSpec('host', true);
        _this.addSpec('protocol', true);
        return _this;
    }

    return IOResourceChain;
}(_fluidChains.Chain);

var IOChains = exports.IOChains = {
    ImportChains: _Import.Chains
};