import { DOWNLOAD_FILE, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';

import { ExecuteChain } from 'fluid-chains';

export const API = '/api/files/';

export default class FileResource {
    constructor(app) {
        app.get('/upload-form', (req, res) => {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        app.get('/update-form/:fileId', function (req, res) {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="' + 'http://' + req.headers.host + '/api/files/update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        app.post(`${API}upload-single-file/:userId`, (req, res) => {
            const file = req.files.uploadFile;
            ExecuteChain(UPLOAD_SINGLE_FILE, {
                fileType: file.type,
                filePath: file.path,
                fileName: file.originalFilename,
                fileSize: file.size,
                createdBy: req.params.userId
            }, result => res.status(result.status()).send(result.dto()));
        });

        app.get(`${API}download-file/:fileId`, function (req, res) {
            ExecuteChain(DOWNLOAD_FILE, {
                fileId: req.params.fileId
            }, result => {
                if (result.status() === 200) {
                    const content = result.content();
                    res.setHeader('Content-disposition', 'attachment; filename=' + result.fileName());
                    res.setHeader('Content-type', result.fileType());
                    res.status(result.status()).send(content[0].content);
                } else {
                    res.status(result.status()).send(result.dto());
                }
            });
        });

        app.post(`${API}update-single-file-content/:fileId`, function (req, res) {
            const file = req.files.uploadFile;
            ExecuteChain(UPDATE_SINGLE_FILE_CONTENT, {
                fileId: req.params.fileId,
                filePath: file.path,
                uploadedFileInputUpdate: {
                    updatedOn: new Date(),
                    fileSize: file.size
                }
            }, (result) => res.status(result.status()).send(result.dto()));
        });
    }
}