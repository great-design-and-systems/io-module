import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';
import UploadedFileContent from '../../entity/UploadedFileContent';
import fs from 'fs-extra';

export default class CreateUploadedFileContent extends Chain {
    constructor() {
        super('CreateUploadedFileContent', Action, 'RemoveUploadedTempFile', 'UploadedFileErrorHandling');
        this.addSpec('uploadedFileId', true);
        this.addSpec('fileData', true);
    }
}

const Action = (context, param, done) => {
    UploadedFileContent.create({
        fileId: param.uploadedFileId(),
        content: param.fileData(),
        contentSequence: param.contentSequence()
    }, (err, result) => {
        if (err) {
            fs.unlink(param.path());
            new GDSAppLogger(err).error();
            throw err;
        } else {
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('uploadedFileContentId', result._id);
            context.set('uploadedFile', param.uploadedFile());
            context.set('path', param.path());
            done();
        }
    });
}