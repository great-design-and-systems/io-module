import { UploadSingleFile, UploadedFile, UploadedFileContent, UploadedFileErrorHandling } from '../../control/';

export default class Files {
    uploadSingleFile(file, userId, callback) {
        const upload = new UploadSingleFile(file, userId, 'CreateUploadFile', 'UploadedFileErrorHandling');
        new UploadedFileErrorHandling(callback);
        new UploadedFile.CreateUploadFile('UploadedFileErrorHandling', 'ReadUploadedFile');
        new UploadedFile.ReadUploadedFile('UploadedFileErrorHandling', 'CreateUploadedFileContent');
        new UploadedFileContent.CreateUploadedFileContent('UploadedFileErrorHandling');
        upload.execute(() => {

        });
    }
}

function uploadSingleFile(file, userId, callback) {
    new CreateUploadFile(file.originalname, file.mimetype, file.size, userId, function (errUploadedFile, uploadedFile) {
        if (errUploadedFile) {
            fs.unlink(file.path);
            callback({
                message: 'Error creating uploaded file ' + file.originalname
            });
        } else {
            fs.readFile(file.path, function (errFilePath, fileData) {
                if (errFilePath) {
                    fs.unlink(file.path);
                    console.error('upload-single-file', errFilePath);
                    callback({
                        message: 'Failed to read file ' + file.originalname
                    });
                } else {
                    new CreateUploadedFileContent(uploadedFile._id, fileData, 0, function (errContent) {
                        if (errContent) {
                            fs.unlink(file.path);
                            callback(errContent);
                        } else {
                            fs.unlink(file.path, function (errUnlink) {
                                if (errUnlink) {
                                    console.error('upload-single-file', errUnlink);
                                    callback({
                                        message: 'Clean up error for fileId: ' + uploadedFile._id
                                    });
                                } else {
                                    callback(undefined, uploadedFile);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}