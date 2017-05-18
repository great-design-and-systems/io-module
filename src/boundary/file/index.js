import Files from './Files';

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/uploads';
export const API = '/api/files/';

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
            files.uploadSingleFile(req.file, req.params.userId, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error uploading file ' + req.file.originalName
                    });
                } else {
                    res.send({
                        message: 'File has been uploaded',
                        fileId: result._id,
                        links: {
                            downloadFile: 'http://' + req.headers.host + API + 'download-file/' + result._id,
                            post: { updateSingleFileContent: 'http://' + req.headers.host + API + 'update-single-file-content/' + result._id },
                            delete: {
                                deleteFile: 'http://' + req.headers.host + API + result._id
                            }
                        }
                    });
                }
            });
        });
    }
}