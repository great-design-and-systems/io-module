import { DELETE_FILE, DOWNLOAD_FILE, GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';

import { ExecuteChain } from 'fluid-chains';
import { GDSResource } from 'gds-config';
import { init } from './File';

export const API = 'api/files';

export default class FileResource extends GDSResource {
    constructor(app) {
        super(app, API);
        init();
        this.get('uploadForm', 'upload-form', (req, res) => {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        this.get('updateForm', 'update-form/:fileId', function (req, res) {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="' + 'http://' + req.headers.host + '/api/files/update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        this.post(UPLOAD_SINGLE_FILE, 'upload-single-file/:userId', (req, res) => {
            const file = req.files.uploadFile;
            ExecuteChain(UPLOAD_SINGLE_FILE, {
                fileType: file.type,
                filePath: file.path,
                fileName: file.originalFilename,
                fileSize: file.size,
                createdBy: req.params.userId
            }, result => res.status(result.status()).send(result.dto()));
        });

        this.get(DOWNLOAD_FILE, 'download-file/:fileId', (req, res) => {
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

        this.post(UPDATE_SINGLE_FILE_CONTENT, 'update-single-file-content/:fileId',
            (req, res) => {
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

        this.delete(DELETE_FILE, ':fileId', (req, res) => {
            ExecuteChain(DELETE_FILE, {
                fileId: req.prams.fileId
            }, (result) => res.status(result.status()).send(result.dto()));
        });

        this.get(GET_FILE_DETAIL_BY_ID, 'get-file-detail-by-id/:fileId', (req, res) => {
            ExecuteChain(GET_FILE_DETAIL_BY_ID, {
                fileId: req.params.fileId
            }, (result) => res.status(result.status()).send(result.dto()));
        });
    }
}