import { GDSAppLogger, GDSChain } from 'gds-config';

import fs from 'fs-extra';

export default class ReadUploadedFile extends GDSChain {
    constructor(error, next) {
        super('ReadUploadedFile', Action, next, error);
    }
}

const Action = (context, param, done) => {
    fs.readFile(param.path(), (err, fileData) => {
        if (err) {
            fs.unlink(param.path());
            throw err;
        } else {
            context.set('contentSequence', 0);
            context.set('uploadedFileId', param.uploadedFileId());
            context.set('path', param.path());
            context.set('fileData', fileData);
            done();
        }
    });
}