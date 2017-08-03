import { ATTACH_FILE_TO_USER, COPY_FILE_FROM_URL, DELETE_FILE, DOWNLOAD_FILE, GET_FILES, GET_FILE_DETAIL_BY_ID, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';
import { Chain, ChainMiddleware, ExecuteChain } from 'fluid-chains';
import { UploadedFile, UploadedFileContent, Util } from '../chains/';

import { GDSDomainDTO } from 'gds-stack';

class UploadSingleFile extends Chain {
    constructor() {
        super(UPLOAD_SINGLE_FILE, (context, param, next) => {
            ExecuteChain([UploadedFile.CREATE_UPLOADED_FILE,
            Util.READ_FILE,
            UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT,
            Util.REMOVE_FILE,
            UploadedFile.GET_UPLOADED_FILE_BY_ID], {
                    fileName: param.fileName(),
                    fileType: param.fileType(),
                    fileSize: param.fileSize(),
                    createdBy: param.createdBy(),
                    filePath: param.filePath()
                }, (result) => {
                    if (result.$err) {
                        context.set('status', 500);
                        context.set('dto', new GDSDomainDTO('ERROR_' + UPLOAD_SINGLE_FILE, result.$errorMessage()));
                        next();
                    } else {
                        context.set('status', 200);
                        context.set('dto', new GDSDomainDTO(UPLOAD_SINGLE_FILE, result.uploadedFile()));
                        next();
                    }
                });
        });
        this.addSpec('fileName', true);
        this.addSpec('fileType', true);
        this.addSpec('fileSize', true);
        this.addSpec('createdBy', true);
        this.addSpec('filePath', true);
    }
}

class DownloadFile extends Chain {
    constructor() {
        super(DOWNLOAD_FILE, (context, param, next) => {
            ExecuteChain([
                UploadedFileContent.GET_UPLOADED_FILE_CONTENT_BY_ID
            ], { fileId: param.fileId() }, result => {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + DOWNLOAD_FILE, result.$errorMessage()));
                    next();
                } else {
                    ExecuteChain(UploadedFile.GET_UPLOADED_FILE_BY_ID, {
                        fileId: param.fileId()
                    }, (uploadedFileResult) => {
                        if (!uploadedFileResult.$err) {
                            const uploadedFile = uploadedFileResult.uploadedFile();
                            context.set('status', 200);
                            context.set('content', result.uploadedFileContent());
                            context.set('fileName', uploadedFile.fileName);
                            context.set('fileSize', uploadedFile.fileSize);
                            context.set('fileType', uploadedFile.fileType);
                            next();
                        } else {
                            next(uploadedFileResult.$err());
                        }
                    });

                }
            });
        });
        this.addSpec('fileId', true);
    }
}

class UpdateSingleFileContent extends Chain {
    constructor() {
        super(UPDATE_SINGLE_FILE_CONTENT, (context, param, next) => {
            ExecuteChain([
                Util.READ_FILE,
                UploadedFileContent.UPDATE_UPLOADED_FILE_CONTENT_BY_ID,
                Util.REMOVE_FILE,
                UploadedFile.UPDATE_UPLOADED_FILE_BY_ID
            ], {
                    fileId: param.fileId(),
                    uploadedFileInputUpdate: param.uploadedFileInputUpdate(),
                    filePath: param.filePath()
                }, result => {
                    if (result.$err) {
                        context.set('status', 500);
                        context.set('dto', new GDSDomainDTO('ERROR_' + UPDATE_SINGLE_FILE_CONTENT, result.$errorMessage()));
                        next();
                    } else {
                        context.set('status', 200);
                        context.set('dto', new GDSDomainDTO(UPDATE_SINGLE_FILE_CONTENT, "File update completed."));
                        next();
                    }
                });
        });
        this.addSpec('uploadedFileInputUpdate', true);
        this.addSpec('fileId', true);
        this.addSpec('filePath', true);
    }
}

class DeleteFile extends Chain {
    constructor() {
        super(DELETE_FILE, (context, param, next) => {
            ExecuteChain([
                UploadedFileContent.REMOVE_UPLOADED_FILE_CONTENT_BY_ID,
                UploadedFile.REMOVE_UPLOADED_FILE], {
                    fileId: param.fileId()
                }, result => {
                    if (result.$err) {
                        context.set('status', 500);
                        context.set('dto', new GDSDomainDTO('ERROR_' + DELETE_FILE, result.$errorMessage()));
                        next();
                    } else {
                        context.set('status', 200);
                        context.set('dto', new GDSDomainDTO(DELETE_FILE, `File with id: ${param.fileId()} have been removed.`));
                        next();
                    }
                });
        });
        this.addSpec('fileId', true);
    }
}

class GetFileDetailById extends Chain {
    constructor() {
        super(GET_FILE_DETAIL_BY_ID, (context, param, next) => {
            ExecuteChain(UploadedFile.GET_UPLOADED_FILE_BY_ID, {
                fileId: param.fileId()
            }, result => {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + GET_FILE_DETAIL_BY_ID, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new GDSDomainDTO(GET_FILE_DETAIL_BY_ID, result.uploadedFile()));
                    next();
                }
            });
        });
        this.addSpec('fileId', true);
    }
}

class GetFiles extends Chain {
    constructor() {
        super(GET_FILES, (context, param, next) => {
            ExecuteChain(UploadedFile.GET_UPLOADED_FILES, {}, result => {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + GET_FILES, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new GDSDomainDTO(GET_FILES, result.files()));
                    next();
                }
            });
        });
    }
}

class CopyFileFromUrl extends Chain {
    constructor() {
        super(COPY_FILE_FROM_URL, (context, param, next) => {
            ExecuteChain(
                [Util.GET_FILE_INFO_FROM_URL,
                UploadedFile.CREATE_UPLOADED_FILE,
                Util.GET_FILE_BUFFER_FROM_URL,
                UploadedFileContent.CREATE_UPLOADED_FILE_CONTENT],
                {
                    fileName: param.fileName(),
                    fileURL: param.fileURL(),
                    createdBy: param.createdBy()
                }, result => {
                    if (result.$err) {
                        context.set('status', 500);
                        context.set('dto', new GDSDomainDTO('ERROR_' + COPY_FILE_FROM_URL, result.$errorMessage()));
                        next();
                    } else {
                        context.set('status', 200);
                        context.set('dto', new GDSDomainDTO(COPY_FILE_FROM_URL, { fileId: result.fileId(), fileContentId: result.fileContentId() }));
                        next();
                    }
                });
        });
        this.addSpec('fileName').require();
        this.addSpec('createdBy').require();
        this.addSpec('fileURL').require();
    }
}

class AttachFileToUser extends Chain {
    constructor() {
        super(ATTACH_FILE_TO_USER, (context, param, next) => {
            ExecuteChain(UploadedFile.UPDATE_UPLOADED_FILE_BY_ID, {
                fileId: param.fileId(),
                uploadedFileInputUpdate: {
                    usedBy: param.usedBy()
                }
            }, result => {
                if (result.$err) {
                    context.set('status', 500);
                    context.set('dto', new GDSDomainDTO('ERROR_' + ATTACH_FILE_TO_USER, result.$errorMessage()));
                    next();
                } else {
                    context.set('status', 200);
                    context.set('dto', new GDSDomainDTO(ATTACH_FILE_TO_USER, { fileId: param.fileId(), message: 'Updated' }));
                    next();
                }
            });
        });
        this.addSpec('usedBy').require();
        this.addSpec('fileId').require();
    }
}
const init = () => {
    new UploadSingleFile();
    new DownloadFile();
    new UpdateSingleFileContent();
    new DeleteFile();
    new GetFileDetailById();
    new GetFiles();
    new CopyFileFromUrl();
    new AttachFileToUser();
}

init();