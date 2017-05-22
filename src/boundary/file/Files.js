import UploadSingleFile from '../../control/upload-single-file/';

export default class Files {
    uploadSingleFile(file, userId, callback) {
        UploadSingleFile(file, userId, (result) => {
            if (result.$error) {
                console.log('error', result.$error());
                callback(result.$error());
            } else {
                callback(undefined, result.uploadedFile());
            }
        })
    }
}

/*function uploadSingleFile(file, userId, callback) {
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
}*/