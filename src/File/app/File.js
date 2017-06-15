import { Chain, ChainMiddleware, ExecuteChain } from 'fluid-chains';
import { DOWNLOAD_FILE, UPDATE_SINGLE_FILE_CONTENT, UPLOAD_SINGLE_FILE } from './Chain.info';
import { UploadedFile, UploadedFileContent, Util } from '../chains/';

import { GDSDomainDTO } from 'gds-config';

export class UploadSingleFile extends Chain {
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

export class DownloadFile extends Chain {
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

export class UpdateSingleFileContent extends Chain {
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