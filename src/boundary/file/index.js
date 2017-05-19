import Files from './Files';
import multer from 'multer';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/uploads';
export const API = '/api/files/';
const upload = multer({ dest: UPLOAD_DIR });
export class FileResource {
    constructor(app) {
        const files = new Files();
        app.get('/upload-form', (req, res) => {
            res.status(200)
                .send('<html><body>' +
                '<form name="upload" method="post" action="api/file/upload-single-file/0001" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
        });

        app.post(API + 'upload-single-file/:userId', upload.single('uploadFile'), (req, res) => {
            files.uploadSingleFile(req.file, req.params.userId, (err, fileId) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error uploading file ' + req.file.originalName
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