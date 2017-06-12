import Import from './Import';

export const API = '/api/import/';
export default class ImportResource {
    constructor(app) {
        app.post(API + 'create-import-csv', function (req, res) {
            /* services.fileServicePort.links.downloadFile.execute({
                 params: {
                     fileId: req.body.fileId
                 }
             }, function (err, result) {
                 if (!err) {*/
            Import.createImportCSV(req.body.description, req.body.fileId,
                req.body.dataFor, result.response.rawEncoded,
                function (
                    err, result) {
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

    }
}