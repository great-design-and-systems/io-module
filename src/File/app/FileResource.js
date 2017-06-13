import { ExecuteChain } from 'fluid-chains';
import { UPLOAD_SINGLE_FILE } from './Chain.info';

export const API = '/api/file/';

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

        app.post(API + 'upload-single-file/:userId', (req, res) => {
            const file = req.files.uploadFile;
            ExecuteChain(UPLOAD_SINGLE_FILE, {
                fileType: file.mimeType,
                filePath: file.path,
                fileName: file.originalname,
                fileSize: file.size,
                createdBy: req.params.userId
            }, result => res.status(result.status()).send(result.dto()));
        });

    }
}