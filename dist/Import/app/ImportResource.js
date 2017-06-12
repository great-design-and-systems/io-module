'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API = undefined;

var _Import = require('./Import');

var _Import2 = _interopRequireDefault(_Import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/import/';

var ImportResource = function ImportResource(app) {
    _classCallCheck(this, ImportResource);

    app.post(API + 'create-import-csv', function (req, res) {
        /* services.fileServicePort.links.downloadFile.execute({
             params: {
                 fileId: req.body.fileId
             }
         }, function (err, result) {
             if (!err) {*/
        _Import2.default.createImportCSV(req.body.description, req.body.fileId, req.body.dataFor, result.response.rawEncoded, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    message: 'Import tracker is created with id: ' + result.importId,
                    importId: result.importId
                });
            }
        });
        // }
    });
};

exports.default = ImportResource;