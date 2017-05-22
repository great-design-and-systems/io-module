import { Chain } from 'fluid-chains';
import fs from 'fs-extra';

export default class RemoveUploadedTempFile extends Chain {
    constructor() {
        super('RemoveUploadedTempFile', Action, undefined, 'UploadedFileErrorHandling');
        this.addSpec('path', true);
    }
}

const Action = (context, param, done) => {
    fs.unlink(param.path());
    context.set('uploadedFileId', param.uploadedFileId());
    context.set('uploadedFileContentId', param.uploadedFileContentId());
    context.set('uploadedFile', param.uploadedFile());
    done();
}