import { Chain } from 'fluid-chains';
import { GDSAppLogger } from 'gds-config';
import fs from 'fs-extra';

export default class ReadUploadedFile extends Chain {
    constructor() {
        super('ReadUploadedFile', Action, 'CreateUploadedFileContent', 'UploadedFileErrorHandling');
        this.addSpec('path', true);
    }
}

const Action = (context, param, done) => {
    fs.readFile(param.path(), (err, fileData) => {
        if (err) {
            new GDSAppLogger(err).error();
            fs.unlink(param.path());
            throw err;
        } else {
            context.set('contentSequence', 0);
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('path', param.path());
            context.set('fileData', fileData);
            context.set('uploadedFile', param.uploadedFile());
            done();
        }
    });
}