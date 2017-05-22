import Files from './Files';
import multer from 'multer';

export const API = '/api/files/';
const upload = multer({
    dest: process.env.TEMP_DIR || 'uploads/'
});
export class FileResource {
    constructor(app) {
        const files = new Files();
        app.get('/upload-form', (req, res) => {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="api/files/upload-single-file/0001" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        app.post(API + 'upload-single-file/:userId', (req, res) => {
            files.uploadSingleFile(req.files.uploadFile, req.params.userId, (err, fileId) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error uploading file ' + req.files.uploadFile.originalFilename
                    });
                } else {
                    res.send({
                        message: 'File has been uploaded',
                        fileId: fileId,
                        links: {
                            downloadFile: 'http://' + req.headers.host + API + 'download-file/' + fileId,
                            post: { updateSingleFileContent: 'http://' + req.headers.host + API + 'update-single-file-content/' + fileId },
                            delete: {
                                deleteFile: 'http://' + req.headers.host + API + fileId
                            }
                        }
                    });
                }
            });
        });
    }
}