import { Chain, ExecuteChain } from 'fluid-chains';
import { UploadedFile, UploadedFileContent, Util } from '../chains/';

import { GDSDomainDTO } from 'gds-config';
import { UPLOAD_SINGLE_FILE } from './Chain.info';

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